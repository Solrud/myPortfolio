import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BASE_URL, BASEURL} from "../../../../app.constant";
import {VisitorsDTO} from "../../model/dto/impl/VisitorsDTO";

@Injectable({
  providedIn: 'root'
})
export class ApiVisitorsService {
  constructor(private httpClient: HttpClient,
              @Inject(BASE_URL) private baseUrl: InjectionToken<string>) {
  }

  create$(): Observable<boolean>{
    //ToDo через роутинг сервис потом взять путь
    let currentPath = window.location.pathname;
    return this.httpClient
      .get<boolean>(this.baseUrl + '/addnewvisitorinfo',
        {params: {referrer: currentPath}})
  }

  getAll$(): Observable<VisitorsDTO[]>{
    return this.httpClient
      .get<any>(this.baseUrl + '/getallvisitors')
      .pipe(
        map(result => result.visitors)
      );
  }

  search$(visitorsDTO: VisitorsDTO): Observable<VisitorsDTO[]> {
    return this.httpClient
      .post<VisitorsDTO[]>(this.baseUrl + '/searchvisitors', visitorsDTO);
  }
}
