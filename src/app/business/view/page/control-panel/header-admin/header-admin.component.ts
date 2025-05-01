import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventsService} from "../../../../data/service/OptionalService/events.service";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit{
  @Output()
  readonly openSidenav = new EventEmitter<void>();

  countVisitors: number = 0;
  countUniqueVisitors: number = 0;

  constructor(private eventService: EventsService) {
  }

  ngOnInit(): void {
    this.eventService.allDataVisitorList$.subscribe( (result: any[]) => {
      this.countVisitors = result?.length;

      const uniqueIps = new Set(result.map(obj => obj.ip));
      this.countUniqueVisitors = uniqueIps.size;
    })
  }

  onClickOpenSidenav(){
    this.openSidenav.emit();
  }
}
