import {AfterViewInit, Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {EventsService} from "../../data/service/OptionalService/events.service";
import {debounceTime} from "rxjs/operators";
import {DEBOUNCE_TIME} from "../../../app.constant";

@Directive({
  selector: '[appShowSpinner]'
})
export class ShowSpinnerDirective<T> implements AfterViewInit{

  constructor(private templateRef: TemplateRef<T>,
              private viewContainerRef: ViewContainerRef,
              private eventService: EventsService)
  { }

  ngAfterViewInit(): void {
    this.eventService.spinnerVisibility$
      .pipe(
        debounceTime(DEBOUNCE_TIME))
      .subscribe( result => {
        this.viewContainerRef.clear();
        if (result)
          this.viewContainerRef.createEmbeddedView(this.templateRef);
      })
  }
}
