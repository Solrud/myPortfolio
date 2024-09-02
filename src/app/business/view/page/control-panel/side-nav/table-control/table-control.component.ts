import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TableType} from "./table-type";

@Component({
  selector: 'app-table-control',
  templateUrl: './table-control.component.html',
  styleUrls: ['./table-control.component.css']
})
export class TableControlComponent implements OnChanges{
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort

  @Input()
  dataSourceFromBackend: any | null = null;

  @Input()
  displayedColumns: string[] | null = null

  @Input()
  tableForType: TableType | null = null

  @Output()
  onClickRow = new EventEmitter<any>();

  matDataSource: MatTableDataSource<any[]> | null;
  matDataSourceLength: number = 0;

  constructor(private snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges) {
    let inputDataSourceFromBackend = changes['dataSourceFromBackend']
    if (inputDataSourceFromBackend){
      this.matDataSource = new MatTableDataSource<any[]>(inputDataSourceFromBackend.currentValue);
      this.matDataSourceLength =  this.matDataSource.data?.length
      this.matDataSource.sort = this.sort;
      this.matDataSource.paginator = this.paginator;

      this.snackBar.open('Обновлено', 'Закрыть', {
        duration: 2000,
      })
    }
  }

  onClickRowFromTable(row: string): void{
    this.onClickRow.emit(row);
  }

  get TableType() {
    return TableType
  }
}
