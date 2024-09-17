import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {EventsService} from "../../data/service/OptionalService/events.service";
import {finalize} from "rxjs/operators";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  counterActiveRequests: number = 0;

  blackListUrl = ['addnewvisitorinfo', 'adduser']

  constructor(private eventService: EventsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestUrlSegmentList = request.url.split('/')
    const requestUrlLastSegment = requestUrlSegmentList[requestUrlSegmentList.length-1]

    if(this.counterActiveRequests === 0 && !this.blackListUrl.includes(requestUrlLastSegment))
      this.eventService.spinnerVisibility$.next(true);

    this.counterActiveRequests++;

    return next.handle(request)
      .pipe(
        finalize(() => {
          this.counterActiveRequests--;
          if(this.counterActiveRequests === 0)
            this.eventService.spinnerVisibility$.next(false);
        })
      );
  }
}
