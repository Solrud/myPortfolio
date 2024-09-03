import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BASE_URL} from "../../../../app.constant";
import {VisitorDTO} from "../../model/dto/impl/VisitorDTO";

@Injectable({
  providedIn: 'root'
})
export class ApiVisitorsService {
  constructor(private httpClient: HttpClient,
              @Inject(BASE_URL) private baseUrl: InjectionToken<string>) {
  }

  create$(visitor: VisitorDTO): Observable<boolean>{
    //ToDo через роутинг сервис потом взять путь
    return this.httpClient
      .post<boolean>(this.baseUrl + '/addnewvisitorinfo', visitor)
  }

  getAll$(): Observable<VisitorDTO[]>{
    return this.httpClient
      .get<any>(this.baseUrl + '/getallvisitors')
      .pipe(
        map(result => result.visitors)
      );
  }

  search$(visitorsDTO: VisitorDTO): Observable<VisitorDTO[]> {
    return this.httpClient
      .post<VisitorDTO[]>(this.baseUrl + '/searchvisitors', visitorsDTO);
  }
}
