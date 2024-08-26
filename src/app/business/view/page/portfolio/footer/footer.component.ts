import { Component } from '@angular/core';
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private openDialogService: OpenDialogService) {
  }

  onContactMe(){
    this.openDialogService.openDialogContactMe();
  }
  onClickTelegramIcon(){
    window.open('https://t.me/rudalsmolyusr');
  }
  onClickMailIcon(){
    window.open('mailto:matthew.avid.ng@gmail.com')
  }
}
