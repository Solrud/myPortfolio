import { Injectable } from '@angular/core';
import {ApiVisitorsService} from "./api-visitors.service";
import {Observable} from "rxjs";
import {VisitorDTO} from "../../model/dto/impl/VisitorDTO";

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  constructor(private apiVisitorsService: ApiVisitorsService) { }

  create(): Observable<boolean>{
    return this.apiVisitorsService.create$();
  }

  getAll(): Observable<VisitorDTO[]>{
    return this.apiVisitorsService.getAll$();
  }

  search(searchObj: VisitorDTO): Observable<VisitorDTO[]>{
    return this.apiVisitorsService.search$(searchObj);
  }
}
