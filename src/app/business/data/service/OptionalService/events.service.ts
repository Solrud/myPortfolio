import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  isDontShowAgainForDelete$ = new BehaviorSubject(false);

  spinnerVisibility$ = new BehaviorSubject(false);
}

