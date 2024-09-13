import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IpDescriptionDTO} from "../../model/dto/impl/IpDescriptionDTO";

@Injectable({
  providedIn: 'root'
})
export class IpDescriptionService {

  constructor(private httpClient: HttpClient)
  { }

  changeIpDescription(ipDesc: IpDescriptionDTO): Observable<boolean> {
    return this.httpClient
      .post<boolean>('/changeipdescription', ipDesc);
  }
}
