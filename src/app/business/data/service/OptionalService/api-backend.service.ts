import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactsDTO} from "../../model/dto/impl/ContactsDTO";
import {BASEURL} from "../../../../app.constant";

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
    // this.http.get(BASEURL + '/addnewuserinfo').subscribe(result => {
    //   // console.log(result);
    // })
  }

  getAllVisitors(){
    this.http.get(BASEURL + '/getallvisitors').subscribe(result => {
      console.log(result);
    })
  }
}


