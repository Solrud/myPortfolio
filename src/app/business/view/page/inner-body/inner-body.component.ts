import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {RESUME_CARDS} from "../../../../app.constant";
import {OpenDialogService} from "../../../data/service/OptionalService/open-dialog.service";

@Component({
  selector: 'app-inner-body',
  templateUrl: './inner-body.component.html',
  styleUrls: ['./inner-body.component.css']
})
export class InnerBodyComponent implements OnInit{
  resumeCards = RESUME_CARDS;

  constructor(private openDialogService: OpenDialogService) {
  }

  ngOnInit(): void {
    console.log()
  }

  onContactMe(){
    this.openDialogService.openDialogContactMe();
  }
}
