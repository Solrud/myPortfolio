import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactDTO} from "../../model/dto/impl/ContactDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiContactsService {

  constructor(private httpClient: HttpClient) { }

  create$(contact: ContactDTO): Observable<boolean> {
    return this.httpClient
      .post<boolean>('/adduser', contact);
  }

  getAll$(): Observable<ContactDTO[]> {
    return this.httpClient
      .get<ContactDTO[]>('/getallfeedbacks');
  }
}
