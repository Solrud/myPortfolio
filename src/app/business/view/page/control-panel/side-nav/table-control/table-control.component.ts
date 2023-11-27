import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {VisitorsDTO} from "../../../../../data/model/dto/impl/VisitorsDTO";

@Component({
  selector: 'app-table-control',
  templateUrl: './table-control.component.html',
  styleUrls: ['./table-control.component.css']
})
export class TableControlComponent implements DoCheck, OnInit{

  @Input()
  dataFromAllVisitorsList: VisitorsDTO[] | null = null;

  displayedColumns = ['id', 'ip']
  // displayedColumns = ['position', 'name']
  dataSource =  []
  toShowTest = false;

  ngDoCheck() {
    console.log(this.dataFromAllVisitorsList)
    if (this.dataFromAllVisitorsList && this.dataFromAllVisitorsList.length > 0){
      console.log('this.dataFromAllVisitorsList')
      for(let i = 0; i < this.dataFromAllVisitorsList.length; i++){

        let newSource = {id:  this.dataFromAllVisitorsList[i].id, ip: this.dataFromAllVisitorsList[i].ip}
        this.dataSource.push(newSource);

      }



    }

    this.toShowTest = true;
    // this.dataSource = this.dataFromAllVisitorsList
  }

  ngOnInit() {
    console.log(this.dataFromAllVisitorsList);
  }


}

