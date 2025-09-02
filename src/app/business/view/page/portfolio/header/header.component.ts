import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {FileService} from "../../../../shared/file/file.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(
    private scroller: ViewportScroller,
    private file: FileService)
  {}

  ngOnInit(): void {

  }


  scrollToSection(sectionID: string) {
    this.scroller.scrollToAnchor(sectionID)
  }

  openPortfolioInTab(): void {
    this.file.openFileInNewWindow('assets/files/temp-portfolio.pdf')
  }

}
