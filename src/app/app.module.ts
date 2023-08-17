import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsideComponent } from './business/view/page/aside/aside.component';
import { MainComponent } from './business/view/page/main/main.component';
import { BodyComponent } from './business/view/page/body/body.component';
import { HeaderComponent } from './business/view/page/header/header.component';
import { FooterComponent } from './business/view/page/footer/footer.component';
import { InnerBodyComponent } from './business/view/page/inner-body/inner-body.component';
import { ContactMeDialogComponent } from './business/view/dialog/contact-me-dialog/contact-me-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    MainComponent,
    BodyComponent,
    HeaderComponent,
    FooterComponent,
    InnerBodyComponent,
    ContactMeDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
