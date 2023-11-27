import {Component, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {ApiBackendService} from "../../../../data/service/OptionalService/api-backend.service";
import {VisitorsDTO} from "../../../../data/model/dto/impl/VisitorsDTO";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  dataVisitorsList: VisitorsDTO[] | null = null;
  constructor(private apiBackendService: ApiBackendService) {
  }

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }

  chkapi(){
    this.apiBackendService.getAllVisitors().subscribe(result =>
      this.dataVisitorsList = result
    )}
}
