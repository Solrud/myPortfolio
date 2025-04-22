import {Component, OnInit} from '@angular/core';
import {VisitorsService} from "./business/data/service/Visitors/visitors.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {VisitorDTO} from "./business/data/model/dto/impl/VisitorDTO";
import {Event, NavigationEnd, Router} from "@angular/router";
import {environment} from "../environment/environment";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {class: "control-main-bg"}
})
export class AppComponent implements OnInit{
  constructor(private visitorsService: VisitorsService,
              private deviceDetectorService: DeviceDetectorService,
              private router: Router) {
  }


  ngOnInit() {
    this._addNewVisitor();
  }

  _addNewVisitor(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        map( event => event.url)
      )
      .subscribe(url => {
        if(environment.production){
          const deviceInfo = this.deviceDetectorService.getDeviceInfo()
          const screen_width = window.innerWidth
          const screen_height = window.innerHeight

          let newVisitor = new VisitorDTO();
          newVisitor.path = url;
          newVisitor.browser = deviceInfo.browser;
          newVisitor.browser_version = deviceInfo.browser_version;
          newVisitor.os = deviceInfo.os;
          newVisitor.os_version = deviceInfo.os_version;
          newVisitor.device = deviceInfo.device;
          newVisitor.device_type = deviceInfo.deviceType;
          newVisitor.orientation = deviceInfo.orientation;
          newVisitor.screen_width = screen_width;
          newVisitor.screen_height = screen_height;

          this.visitorsService.create(newVisitor).subscribe();
        }
      })
  }
}
