import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../../../app.constant";
import {Observable} from "rxjs";
import {IpDescriptionDTO} from "../../model/dto/impl/IpDescriptionDTO";

@Injectable({
  providedIn: 'root'
})
export class IpDescriptionService {

  constructor(private httpClient: HttpClient,
              @Inject(BASE_URL) private baseUrl: InjectionToken<string>)
  { }

  changeIpDescription(ipDesc: IpDescriptionDTO): Observable<boolean> {
    return this.httpClient
      .post<boolean>(this.baseUrl + '/changeipdescription', ipDesc);
  }
}
