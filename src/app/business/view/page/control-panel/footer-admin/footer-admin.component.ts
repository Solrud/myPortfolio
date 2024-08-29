import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.css']
})
export class FooterAdminComponent implements OnInit{
  date: Date;

  ngOnInit() {
    this.date = new Date()
  }

}
