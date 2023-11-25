import {Component, OnInit} from '@angular/core';
import {ApiBackendService} from "./business/data/service/OptionalService/api-backend.service";
import {BASEURL} from "./app.constant";

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
    if(this.isFirstTime){
      this.apiService.addVisitorInfo();
      this.isFirstTime = false;

      console.log(BASEURL + '/addallvisitors')
    }

  }
}
