import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LizPageComponent } from './liz-page.component';
import { HeaderLizComponent } from './header-liz/header-liz.component';
import { FooterLizComponent } from './footer-liz/footer-liz.component';
import { BodyLizComponent } from './body-liz/body-liz.component';
import { AsideLizComponent } from './aside-liz/aside-liz.component';
import { InnerBodyLizComponent } from './inner-body-liz/inner-body-liz.component';



@NgModule({
  declarations: [
    LizPageComponent,
    HeaderLizComponent,
    FooterLizComponent,
    BodyLizComponent,
    AsideLizComponent,
    InnerBodyLizComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LizPageComponent
  ]
})
export class LizPageModule { }
