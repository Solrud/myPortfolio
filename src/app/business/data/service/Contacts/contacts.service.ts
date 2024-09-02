import { Injectable } from '@angular/core';
import {ApiContactsService} from "./api-contacts.service";
import {ContactDTO} from "../../model/dto/impl/ContactDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private apiContactsService: ApiContactsService) { }

  create(contact: ContactDTO): Observable<boolean> {
    return this.apiContactsService.create$(contact);
  }

  getAll(): Observable<ContactDTO[]> {
    return this.apiContactsService.getAll$();
  }
}
