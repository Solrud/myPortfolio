import { Injectable } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ContactMeDialogComponent} from "../../../view/dialog/contact-me-dialog/contact-me-dialog.component";
import {ContactDTO} from "../../model/dto/impl/ContactDTO";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(
    private modalService: NgbModal, config: NgbModalConfig)
  {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  openDialogContactMe(): any{
    const openDialogContactMe = this.modalService.open(ContactMeDialogComponent, {scrollable: true});

    return openDialogContactMe;
  }
}


