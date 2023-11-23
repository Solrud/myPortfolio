import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactsDTO} from "../../../data/model/dto/impl/ContactsDTO";

@Component({
  selector: 'app-contact-me-dialog',
  templateUrl: './contact-me-dialog.component.html',
  styleUrls: ['./contact-me-dialog.component.css']
})
export class ContactMeDialogComponent implements OnInit{
  contacts: ContactsDTO;
  newContacts: ContactsDTO;
  fgContacts: FormGroup;

  constructor(
    public activeModal: NgbActiveModal){
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  public get Validators(){
    return Validators;
  }

  initFormGroup(){
    this.fgContacts = new FormGroup({
      id: new FormControl({value: this.contacts ? this.contacts.id : null, disabled: false}),
      firstName: new FormControl({value: this.contacts ? this.contacts.firstName : null, disabled: false}, Validators.required),
      email: new FormControl({value: this.contacts ? this.contacts.email : null, disabled: false},  Validators.email),
      question: new FormControl({value: this.contacts ? this.contacts.question : null, disabled: false},  Validators.required),
      comment: new FormControl({value: this.contacts ? this.contacts.comment : null, disabled: false}),
    })
  }

  onClickSendContact(){
    this.newContacts = new ContactsDTO();
    this.newContacts.id = this.fgContacts.controls['id'].value;
    this.newContacts.firstName = this.fgContacts.controls['firstName'].value;
    this.newContacts.email = this.fgContacts.controls['email'].value;
    this.newContacts.question = this.fgContacts.controls['question'].value;
    this.newContacts.comment = this.fgContacts.controls['comment'].value;

    this.activeModal.close(this.newContacts);
  }

  onClickCancel(){
    this.activeModal.dismiss('Close');
  }
}






