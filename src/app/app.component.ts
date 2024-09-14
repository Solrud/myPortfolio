import {Component, OnInit} from '@angular/core';
import {VisitorsService} from "./business/data/service/Visitors/visitors.service";
import {DeviceDetectorService} from "ngx-device-detector";
import {VisitorDTO} from "./business/data/model/dto/impl/VisitorDTO";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../environment/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private visitorsService: VisitorsService,
              private deviceDetectorService: DeviceDetectorService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if(environment.production){
      const deviceInfo = this.deviceDetectorService.getDeviceInfo()
      const screen_width = window.innerWidth
      const screen_height = window.innerHeight
      const currentPath = window.location.pathname;

      let newVisitor = new VisitorDTO();
      newVisitor.path = currentPath;
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
  }
}
