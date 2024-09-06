import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TableType} from "../table-control/table-type";
import {VisitorDTO} from "../../../../../data/model/dto/impl/VisitorDTO";
import {Visitor} from "@angular/compiler";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-filter-control',
  templateUrl: './filter-control.component.html',
  styleUrls: ['./filter-control.component.css']
})
export class FilterControlComponent implements OnInit, OnChanges{
  @Output()
  newSearchVisitor = new EventEmitter<VisitorDTO>();

  @Input()
  clickedVisitorIp: string;
  @Input()
  filterForTable: TableType;
  @Input()
  searchObj: any;

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

  onClickChangeIpDescFilter(){
    let tempVisitorSearch: VisitorDTO = new VisitorDTO();

    if(this.searchObj.hasIpDesc == null){
      tempVisitorSearch.hasIpDesc = true;
    }
    if(this.searchObj.hasIpDesc == true){
      tempVisitorSearch.hasIpDesc = false;
    }
    if(this.searchObj.hasIpDesc == false){
      tempVisitorSearch.hasIpDesc = null;
    }

    this.newSearchVisitor.emit(tempVisitorSearch)
  }

  onUpdateVisitorSearch(): void {
    let tempVisitorSearch: VisitorDTO = new VisitorDTO();
    tempVisitorSearch.ip = this.fgVisitorsFilter.controls['ip'].value;

    this.newSearchVisitor.emit(tempVisitorSearch);
  }

}
