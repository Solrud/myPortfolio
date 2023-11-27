import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactsDTO} from "../../model/dto/impl/ContactsDTO";
import {BASEURL} from "../../../../app.constant";
import {VisitorsDTO} from "../../model/dto/impl/VisitorsDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {

  constructor(private http: HttpClient) { }

  addNewContactForm(contactsOfUser: ContactsDTO){
    this.http.post(BASEURL + '/adduser', contactsOfUser).subscribe(result=>{
      // console.log(result);
    });
  }

  addVisitorInfo(){
    let currentPath = window.location.pathname;
    // this.http.get(BASEURL + '/addnewuserinfo').subscribe(result => {
    this.http.get(BASEURL + '/getuserinfo', {params: {referrer: currentPath}}).subscribe(result => {
      console.log(result);
    })
  }

  getAllVisitors(): Observable<VisitorsDTO[]>{
    return this.http.get<VisitorsDTO[]>(BASEURL + '/getallvisitors');
  }
}


