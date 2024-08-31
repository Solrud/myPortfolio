import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactsDTO} from "../../model/dto/impl/ContactsDTO";
import {BASEURL} from "../../../../app.constant";
import {VisitorsDTO} from "../../model/dto/impl/VisitorsDTO";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {

  constructor(private http: HttpClient) { }

  addNewContactForm(contactsOfUser: ContactsDTO){
    this.http.post(BASEURL + '/adduser', contactsOfUser);
  }

  addVisitorInfo(){
    let currentPath = window.location.pathname;
    this.http.get(BASEURL + '/addnewvisitorinfo', {params: {referrer: currentPath}}).subscribe(result => {
      // console.log(result);
    })
  }

  getAllVisitors(): Observable<VisitorsDTO[]>{
    return this.http.get<any>(BASEURL + '/getallvisitors').pipe( map(result => result.visitors));
  }

  checkPassword(password: string): Observable<any>{
    return this.http.post<any>(BASEURL + '/checkpassword', password);
  }

  getAllContacts(): Observable<ContactsDTO[]>{
    return this.http.get<ContactsDTO[]>(BASEURL + '/getallfeedbacks');
  }

  searchVisitors(visitorsDTO: VisitorsDTO): Observable<VisitorsDTO[]> {
    return this.http.post<VisitorsDTO[]>(BASEURL + '/searchvisitors', visitorsDTO);
  }
}
