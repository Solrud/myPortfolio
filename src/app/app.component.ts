import {Component, OnInit} from '@angular/core';
import {ApiBackendService} from "./business/data/service/OptionalService/api-backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'myPortfolio';
  isFirstTime = true;
  constructor(private apiService: ApiBackendService) {
  }

  ngOnInit() {
    //ToDo меня менять при разработке

    if(this.isFirstTime){
      this.apiService.addVisitorInfo();
      this.isFirstTime = false;
    }
  }
}
