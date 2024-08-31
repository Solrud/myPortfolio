import {Component, OnInit} from '@angular/core';
import {VisitorsService} from "./business/data/service/Visitors/visitors.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'myPortfolio';
  isFirstTime = true;
  constructor(private visitorsService: VisitorsService) {
  }

  //ToDo доделать сервис с контактами-заявками

  ngOnInit() {
    //ToDo меня менять при разработке
    if (this.isFirstTime){
      this.visitorsService.create().subscribe( result => {
        if(result){
          this.isFirstTime = false;
        }
      });
    }
  }
}
