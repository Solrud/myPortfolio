import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogResult} from "../../../shared/dialog-result";
import {EventsService} from "../../../data/service/OptionalService/events.service";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent{
  dialogTitle: string;
  dialogDescription: string;
  isCheckboxChecked: boolean = false;
  row: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              private eventsService: EventsService) {
    this.dialogTitle = data.dialogTitle;
    this.dialogDescription = data.dialogDescription;
    this.row = data.row;
  }

  onChangeCheckBoxDontShow(){
    const change: boolean = !this.isCheckboxChecked;
    this.eventsService.isDontShowAgainForDelete$.next(change);
  }

  onClickAccept(): any{
    this.dialogRef.close(DialogResult.ACCEPT);
  }

  onClickCloseDialog(): void {
    this.dialogRef.close(DialogResult.CLOSE);
  }
}
