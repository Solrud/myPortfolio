import {
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {VisitorsDTO} from "../../../../../data/model/dto/impl/VisitorsDTO";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-table-control',
  templateUrl: './table-control.component.html',
  styleUrls: ['./table-control.component.css']
})
export class TableControlComponent implements OnChanges, OnInit, AfterViewInit{
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort

  @Input()
  dataFromAllVisitorsList: VisitorsDTO[] | null = null;

  displayedColumns = ['id', 'date', 'ip', 'agent', 'path', 'language']
  dataSource: MatTableDataSource<VisitorsDTO[]> | null;
  inFirstTime = true;

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataFromAllVisitorsList']){
      this.dataSource = new MatTableDataSource<VisitorsDTO[]>(changes['dataFromAllVisitorsList'].currentValue?.visitors);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.snackBar.open('Обновлено', 'Закрыть', {
        duration: 2000,
        panelClass: [`snack-bar-success`]
      })
    }
  }


  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}

