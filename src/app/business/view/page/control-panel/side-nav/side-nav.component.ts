import {Component, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {ApiBackendService} from "../../../../data/service/OptionalService/api-backend.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  constructor(private apiBackendService: ApiBackendService) {
  }

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }

  chkapi(){
    this.apiBackendService.getAllVisitors();
  }
}
