import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TableType} from "../table-control/table-type";
import {VisitorsDTO} from "../../../../../data/model/dto/impl/VisitorsDTO";
import {Visitor} from "@angular/compiler";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-filter-control',
  templateUrl: './filter-control.component.html',
  styleUrls: ['./filter-control.component.css']
})
export class FilterControlComponent implements OnInit, OnChanges{
  @Output()
  newSearchVisitor = new EventEmitter<VisitorsDTO>();

  @Input()
  clickedVisitorIp: string;
  @Input()
  filterForTable: TableType;

  fgVisitorsFilter: FormGroup;


  ngOnInit() {
    this.initDefaultValues();
    this.initFgVisitors();

    this._subscribeVisitorsFormControls();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['clickedVisitorIp'].currentValue){
      this.fgVisitorsFilter.controls['ip'].setValue(changes['clickedVisitorIp'].currentValue);
    }
  }

  initDefaultValues(): void {

  }

  getCorrectValueFromField(value: string): any {
    if(value == 'ip'){
      if(this.filterForTable == TableType.Visitors){
        if(this.clickedVisitorIp)
          return this.clickedVisitorIp;
        return null;
      }
    }
  }

  initFgVisitors(): void {
    this.fgVisitorsFilter = new FormGroup({
      ip: new FormControl({value: this.getCorrectValueFromField('ip'), disabled: false})
    })
  }

  _subscribeVisitorsFormControls() {
    this.fgVisitorsFilter.controls['ip'].valueChanges.
    pipe(
      debounceTime(300)
    ).
    subscribe( input => {
      this.onUpdateVisitorSearch();
    })
  }

  onUpdateVisitorSearch(): void {
    let tempVisitorSearch: VisitorsDTO = new VisitorsDTO();
    tempVisitorSearch.ip = this.fgVisitorsFilter.controls['ip'].value;

    this.newSearchVisitor.emit(tempVisitorSearch);
  }

}
