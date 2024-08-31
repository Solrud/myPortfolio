import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {ApiBackendService} from "../../../../data/service/OptionalService/api-backend.service";
import {VisitorsDTO} from "../../../../data/model/dto/impl/VisitorsDTO";
import {TableType} from "./table-control/table-type";
import {contactsFieldColumnList, visitorsFieldColumnList} from "../../../../../app.constant";
import {ContactsDTO} from "../../../../data/model/dto/impl/ContactsDTO";
import {VisitorsService} from "../../../../data/service/Visitors/visitors.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
  contactsFieldList = contactsFieldColumnList;
  dataContactsList: ContactsDTO[] | null = null;

  searchVisitors: VisitorsDTO | null = null
  dataVisitorsList: VisitorsDTO[] | null = null;
  visitorsFieldList = visitorsFieldColumnList;
  filteredVisitorIp: string;

  constructor(private apiBackendService: ApiBackendService,
              private visitorService: VisitorsService) {
  }

  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  get TableType() {
    return TableType
  }

  ngOnInit(): void {
    if (!this.searchVisitors){
      this.searchVisitors = new VisitorsDTO();
    }
    this.toSearchVisitors(this.searchVisitors);
    this.updateAndGetAllContacts();
  }

  toSearchVisitors(searchObj: VisitorsDTO): void {
    if(searchObj != this.searchVisitors){
      this.toSetNewSearchFromPage(searchObj, this.searchVisitors)
    }

    this.visitorService.search(this.searchVisitors).subscribe( result => {
      this.dataVisitorsList = result;
    })
  }

  updateAndGetAllContacts() {
    this.apiBackendService.getAllContacts().subscribe( result => {
      this.dataContactsList = result
    })
  }

  onClickVisitorRow(row: VisitorsDTO) {
    this.filteredVisitorIp = row.ip;
  }

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }

  // присваивает к существующему search object пагинаторные свойства
  toSetNewSearchFromPage(newSearchPage: VisitorsDTO | ContactsDTO, oldSearch: VisitorsDTO | ContactsDTO){
    Object.keys(newSearchPage).forEach(key => {
      if (oldSearch.hasOwnProperty(key)) {
        oldSearch[key] = newSearchPage[key];
      }
    })
  }
}
