import { Injectable } from '@angular/core';
import {ApiVisitorsService} from "./api-visitors.service";
import {Observable} from "rxjs";
import {VisitorsDTO} from "../../model/dto/impl/VisitorsDTO";

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  constructor(private apiVisitorsService: ApiVisitorsService) { }

  create(): Observable<boolean>{
    return this.apiVisitorsService.create$();
  }

  getAll(): Observable<VisitorsDTO[]>{
    return this.apiVisitorsService.getAll$();
  }

  search(searchObj: VisitorsDTO): Observable<VisitorsDTO[]>{
    return this.apiVisitorsService.search$(searchObj);
  }
}
