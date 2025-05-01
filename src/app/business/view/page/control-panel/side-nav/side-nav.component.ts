import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {VisitorDTO} from "../../../../data/model/dto/impl/VisitorDTO";
import {TableType} from "./table-control/table-type";
import {contactsFieldColumnList, visitorsFieldColumnList} from "../../../../../app.constant";
import {ContactDTO} from "../../../../data/model/dto/impl/ContactDTO";
import {VisitorsService} from "../../../../data/service/Visitors/visitors.service";
import {ContactsService} from "../../../../data/service/Contacts/contacts.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";
import {DialogResult} from "../../../../shared/dialog-result";
import {EventsService} from "../../../../data/service/OptionalService/events.service";

type YearsObjList = {
  [key: string]: any[]
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
  // contact
  contactsFieldList = contactsFieldColumnList;
  dataContactsList: ContactDTO[] | null = null;

  // visitor
  searchVisitors: VisitorDTO | null = null
  dataVisitorsList: VisitorDTO[] | null = null;
  visitorsFieldList = visitorsFieldColumnList;
  filteredVisitorIp: string;
  chosenVisitorRow: VisitorDTO;

  isMobile: boolean;

  isCheckedCheckboxForDelete: boolean;

  //for chart
  // dataVisitorFilterByYearList: VisitorDTO[][] | null;
  dataVisitorFilterByYearObj: YearsObjList = {};

  constructor(private contactsService: ContactsService,
              private visitorService: VisitorsService,
              private deviceDetectorService: DeviceDetectorService,
              private openDialogService: OpenDialogService,
              private eventsService: EventsService) {
  }

  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  get TableType() {
    return TableType
  }

  ngOnInit(): void {
    this.initDefault();

    this.toSearchVisitors(this.searchVisitors);
    this.updateAndGetAllContacts();

    this._subscribeForCheckboxForDelete();
  }

  initDefault(): void {
    this.isMobile = this.deviceDetectorService.isMobile();

    if (!this.searchVisitors)
      this.searchVisitors = new VisitorDTO();
  }

  toSearchVisitors(searchObj: VisitorDTO): void {
    //toDo если фильтр по айпи + фильтр по наличию описания то в обьект поиска попадает последнее свойство (фильтр)

    this.chosenVisitorRow = null;
    this.filteredVisitorIp = null;
    if(searchObj != this.searchVisitors){
      this.toSetNewSearchFromPage(searchObj, this.searchVisitors)
    }

    let dataVisitorsList = [];
    this.visitorService.search(this.searchVisitors).subscribe(result => {
      dataVisitorsList = result;

      for (let i = 0; i < dataVisitorsList.length; i++) {
        const parts = (dataVisitorsList[i].date).split(' ')
        const dateParts = parts[0].split('.');
        const timeParts = parts[1].split(':');
        const utc = parseInt(parts[2].split('+')[1]);

        const date = new Date(Date.UTC(
          parseInt(dateParts[2]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[0]),
          parseInt(timeParts[0]) - utc,
          parseInt(timeParts[1]),
          parseInt(timeParts[2])
        ));

        dataVisitorsList[i].date = date;

        if (!this.dataVisitorFilterByYearObj[date.getFullYear()]){ // заполняем визиторами обьект по годам, для чартов
          this.dataVisitorFilterByYearObj[date.getFullYear()] = [];
        }
        this.dataVisitorFilterByYearObj[date.getFullYear()].push(dataVisitorsList[i])
      }

      this.eventsService.allDataVisitorList$.next(dataVisitorsList); // тут ВСЕ визиторы
      this.eventsService.dataVisitorFilterByYearObj$.next(this.dataVisitorFilterByYearObj); // визторы для чартов по годам

      if(searchObj.hasIpDesc === true){
        dataVisitorsList = dataVisitorsList.filter(visitor => {
          return visitor.ip_description !== null
        });
      }
      if(searchObj.hasIpDesc === false){
        dataVisitorsList = dataVisitorsList.filter(visitor => {
          return visitor.ip_description == null || visitor.ip_description === ''
        })
      }

      this.dataVisitorsList = dataVisitorsList; // а тут визиторы которые отображаются по фильтру
    })
  }

  updateAndGetAllContacts() {
    this.contactsService.getAll().subscribe( result => {
      this.dataContactsList = result
    })
  }

  onClickVisitorRow(row: VisitorDTO) {
    this.chosenVisitorRow = row;
    // this.filteredVisitorIp = row.ip;
  }

  _subscribeForCheckboxForDelete(): void{
    this.eventsService.isDontShowAgainForDelete$.subscribe(resultDontShow => {
      this.isCheckedCheckboxForDelete = resultDontShow;
    })
  }

  onClickDeleteVisitorRow(){
    const row = this.chosenVisitorRow;
      if(!this.isCheckedCheckboxForDelete){
        this.openDialogService.openConfirmDialog(row, 'Вы точно хотите удалить строку с id:')
          .afterClosed()
          .subscribe( dialogResult => {
            if (dialogResult === DialogResult.ACCEPT && row.id){
              this.visitorService.delete(row.id).subscribe( result => {
                if (result === true){
                  this.toSearchVisitors(this.searchVisitors);
                }
              })
            }
          })
      }
      if(this.isCheckedCheckboxForDelete){
        this.visitorService.delete(row.id).subscribe( result => {
          if (result === true){
            this.toSearchVisitors(this.searchVisitors);
          }
        })
      }
  }

  toSearchByVisitorIp() {
    this.filteredVisitorIp = this.chosenVisitorRow.ip;
  }

  toOpenModalForInfoOfVisitor() {
    this.openDialogService.openDialogVisitor(this.chosenVisitorRow)
      .afterClosed()
      .subscribe(resultDialog => {
      if (resultDialog == DialogResult.EDIT){
          this.toSearchVisitors(this.searchVisitors);
        }
    });
  }

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }

  // присваивает к существующему search object пагинаторные свойства
  toSetNewSearchFromPage(newSearchPage: VisitorDTO | ContactDTO, oldSearch: VisitorDTO | ContactDTO){
    Object.keys(newSearchPage).forEach(key => {
      if (oldSearch.hasOwnProperty(key)) {
        oldSearch[key] = newSearchPage[key];
      }
    })
  }
}
