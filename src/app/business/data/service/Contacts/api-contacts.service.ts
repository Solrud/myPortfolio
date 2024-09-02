import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../../../app.constant";
import {ContactDTO} from "../../model/dto/impl/ContactDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiContactsService {

  constructor(private httpClient: HttpClient,
              @Inject(BASE_URL) private baseUrl: InjectionToken<string>) { }

  create$(contact: ContactDTO): Observable<boolean> {
    return this.httpClient
      .post<boolean>(this.baseUrl + '/adduser', contact);
  }

  getAll$(): Observable<ContactDTO[]> {
    return this.httpClient
      .get<ContactDTO[]>(this.baseUrl + '/getallfeedbacks');
  }
}
