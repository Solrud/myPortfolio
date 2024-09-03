import {Injectable} from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ContactMeDialogComponent} from "../../../view/dialog/contact-me-dialog/contact-me-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {VisitorDialogComponent} from "../../../view/dialog/control-panel/visitor-dialog/visitor-dialog.component";
import {VisitorDTO} from "../../model/dto/impl/VisitorDTO";
import {DialogResult} from "../../../shared/dialog-result";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private matModalService: MatDialog)
  {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  openDialogContactMe(): any{
    const openDialogContactMe = this.modalService
      .open(ContactMeDialogComponent, {scrollable: true});

    return openDialogContactMe;
  }

  openDialogVisitor(visitor: VisitorDTO): any {
    const openDialogVisitorRef = this.matModalService
      .open(VisitorDialogComponent, {data: {'visitor': visitor}});

    return openDialogVisitorRef;
  }
}


