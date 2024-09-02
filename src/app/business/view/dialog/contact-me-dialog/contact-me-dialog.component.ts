import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactDTO} from "../../../data/model/dto/impl/ContactDTO";
import {ContactsService} from "../../../data/service/Contacts/contacts.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact-me-dialog',
  templateUrl: './contact-me-dialog.component.html',
  styleUrls: ['./contact-me-dialog.component.css']
})
export class ContactMeDialogComponent implements OnInit{
  contacts: ContactDTO;
  newContacts: ContactDTO;
  fgContacts: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private contactsService: ContactsService,
    private matSnackBat: MatSnackBar){
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
      firstName: new FormControl({value: this.contacts ? this.contacts.name : null, disabled: false}, Validators.required),
      email: new FormControl({value: this.contacts ? this.contacts.email : null, disabled: false},  Validators.email),
      question: new FormControl({value: this.contacts ? this.contacts.question : null, disabled: false},  Validators.required),
      comment: new FormControl({value: this.contacts ? this.contacts.comment : null, disabled: false}),
    })
  }

  onClickSendContact(){
    this.newContacts = new ContactDTO();
    this.newContacts.id = this.fgContacts.controls['id'].value;
    this.newContacts.name = this.fgContacts.controls['firstName'].value;
    this.newContacts.email = this.fgContacts.controls['email'].value;
    this.newContacts.question = this.fgContacts.controls['question'].value;
    this.newContacts.comment = this.fgContacts.controls['comment'].value;

    this.addNewContacts(this.newContacts);
    this.activeModal.close();
  }

  addNewContacts(newContacts: ContactDTO){
    this.contactsService.create(newContacts).subscribe( result => {
      if (result == true){
        this.matSnackBat.open('Контакты отправлены!', null, {
          duration: 3000,
          panelClass: 'snack-bat-create_contact'
        })
      }else{
        this.matSnackBat.open('Не удалось отправить контакты(', 'Закрыть', {
          duration: 5000,
          panelClass: 'snack-bat-create_contact'
        })
      }
    });
  }

  onClickCancel(){
    this.activeModal.dismiss('Close');
  }
}






