import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  isDontShowAgainForDelete$ = new BehaviorSubject(false);

  spinnerVisibility$ = new BehaviorSubject(false);

  allDataVisitorList$ = new Subject();

  dataVisitorFilterByYearObj$ = new Subject();
}

