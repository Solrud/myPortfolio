import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ContactsDTO} from "../../model/dto/impl/ContactsDTO";

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {

  constructor(private http: HttpClient) { }

  addNewContactForm(contactsOfUser: ContactsDTO){
    this.http.post('http://cg50261.tw1.ru/api/adduser', contactsOfUser).subscribe(result=>{
      // console.log(result);
    });
  }

  getUserInfo(){
    this.http.get('http://cg50261.tw1.ru/api/getuserinfo').subscribe(result => {
      // console.log(result);
    })
  }
}
