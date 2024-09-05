import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{
  // @HostListener('scroll', ['$event'])
  // scrollTest(event: any){
  //   console.log(event)
  // }
  //
  // @ViewChild('body')
  // bodyRef: ElementRef;

  // constructor(private elementRef: ElementRef) {}

  // ngAfterViewInit(): void {
  //   const contentElement = this.elementRef.nativeElement;
  //   const scrollHeight = contentElement.scrollHeight;
  //   const clientHeight = contentElement.clientHeight;
  //
  //   window.addEventListener('scroll', () => {
  //     const scrollTop = window.scrollY;
  //     const scrollBottom = scrollTop + clientHeight;
  //
  //     console.log(scrollBottom)
  //     console.log(scrollHeight)
  //     if (scrollBottom >= scrollHeight){
  //       console.log('до конца')
  //     }
  //   })
  // }

}
