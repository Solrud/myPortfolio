import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {VisitorDTO} from "../../model/dto/impl/VisitorDTO";

@Injectable({
  providedIn: 'root'
})
export class ApiVisitorsService {
  constructor(private httpClient: HttpClient) {
  }

  create$(visitor: VisitorDTO): Observable<boolean>{
    //ToDo через роутинг сервис потом взять путь
    return this.httpClient
      .post<boolean>('/addnewvisitorinfo', visitor)
  }

  getAll$(): Observable<VisitorDTO[]>{
    return this.httpClient
      .get<any>('/getallvisitors')
      .pipe(
        map(result => result.visitors)
      );
  }

  search$(visitorsDTO: VisitorDTO): Observable<VisitorDTO[]> {
    return this.httpClient
      .post<VisitorDTO[]>('/searchvisitors', visitorsDTO);
  }

  delete$(id: number): Observable<any>{
    return this.httpClient
      .post<any>('/deletevisitor', id);
  }
}
