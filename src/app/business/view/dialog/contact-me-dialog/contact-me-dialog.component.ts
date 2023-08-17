import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-contact-me-dialog',
  templateUrl: './contact-me-dialog.component.html',
  styleUrls: ['./contact-me-dialog.component.css']
})
export class ContactMeDialogComponent {
  constructor(
    public activeModal: NgbActiveModal){
  }

  onClickCancel(){
    this.activeModal.dismiss('Close');
  }
}
