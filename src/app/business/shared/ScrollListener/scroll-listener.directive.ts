import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {ScrollDirection} from "./scroll-direction";

@Directive({
  selector: '[appScrollListener]'
})
export class ScrollListenerDirective {
  @Output()
  readonly scrollDestination = new EventEmitter<ScrollDirection>()

  @HostListener('scroll', ['$event'])
  private scrollListen(event: any){
    console.log(event)
    // console.log(scrollHeight);
    // console.log(scrollTop);
    // console.log(clientHeight);
  }
}
