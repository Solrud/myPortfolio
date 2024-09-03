import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VisitorDTO} from "../../../../data/model/dto/impl/VisitorDTO";
import {DeviceDetectorService} from "ngx-device-detector";
import {FormControl, FormGroup} from "@angular/forms";
import {IpDescriptionService} from "../../../../data/service/OtherService/ip-description.service";
import {IpDescriptionDTO} from "../../../../data/model/dto/impl/IpDescriptionDTO";
import {DialogResult} from "../../../../shared/dialog-result";

@Component({
  selector: 'app-visitor-dialog',
  templateUrl: './visitor-dialog.component.html',
  styleUrls: ['./visitor-dialog.component.css']
})
export class VisitorDialogComponent implements OnInit{
  visitor: VisitorDTO;
  isMobile: boolean = false;
  fgVisitor: FormGroup;
  isIpDescriptionChanged: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private deviceDetectorService: DeviceDetectorService,
              private ipDescriptionService: IpDescriptionService,
              private dialogRef: MatDialogRef<VisitorDialogComponent>) {
    this.visitor = data.visitor;
    this.isMobile = this.deviceDetectorService.isMobile()
  }

  ngOnInit(): void {
    this.fgVisitor = new FormGroup({
      ipDescription: new FormControl({value: this.getCorrectValueFromField('ipDescription'), disabled: false})
    })

    this.fgVisitor.controls['ipDescription'].valueChanges.subscribe( input => {
      this.isIpDescriptionChanged = input.trim() != this.visitor.ip_description;
    })
  }

  getCorrectValueFromField(value: string): any {
    if(value == 'ipDescription' && this.visitor.ip_description)
        return this.visitor.ip_description
    return null;
  }

  onClickSaveIpDescription(): void {
    let fcIpDesc = this.fgVisitor.controls['ipDescription'].value;
    fcIpDesc = fcIpDesc.trim();
    if(this.visitor.ip){
      let newIpDesc = new IpDescriptionDTO();
      newIpDesc.ip = this.visitor.ip;
      newIpDesc.description = fcIpDesc;

      this.ipDescriptionService.changeIpDescription(newIpDesc).subscribe( result => {
        if(result === true){
          this.dialogRef.close(DialogResult.EDIT);
        }
      })
    }
  }

  onClickCloseDialog(): void {
    this.dialogRef.close(DialogResult.CLOSE);
  }
}
