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

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
  contactsFieldList = contactsFieldColumnList;
  dataContactsList: ContactDTO[] | null = null;

  searchVisitors: VisitorDTO | null = null
  dataVisitorsList: VisitorDTO[] | null = null;
  visitorsFieldList = visitorsFieldColumnList;
  filteredVisitorIp: string;
  chosenVisitorRow: VisitorDTO;

  isMobile: boolean;

  constructor(private contactsService: ContactsService,
              private visitorService: VisitorsService,
              private deviceDetectorService: DeviceDetectorService,
              private openDialogService: OpenDialogService) {
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
  }

  initDefault(): void {
    this.isMobile = this.deviceDetectorService.isMobile();

    if (!this.searchVisitors)
      this.searchVisitors = new VisitorDTO();
  }

  toSearchVisitors(searchObj: VisitorDTO): void {
    this.chosenVisitorRow = null;
    this.filteredVisitorIp = null;
    if(searchObj != this.searchVisitors){
      this.toSetNewSearchFromPage(searchObj, this.searchVisitors)
    }

    this.visitorService.search(this.searchVisitors).subscribe( result => {
      this.dataVisitorsList = result;
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

  toSearchByVisitorIp() {
    this.filteredVisitorIp = this.chosenVisitorRow.ip;
  }

  toOpenModalForInfoOfVisitor() {
    this.openDialogService.openDialogVisitor(this.chosenVisitorRow).afterClosed().subscribe(resultDialog => {
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
