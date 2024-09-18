import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AsideComponent} from './business/view/page/portfolio/aside/aside.component';
import {MainComponent} from './business/view/page/portfolio/main/main.component';
import {BodyComponent} from './business/view/page/portfolio/body/body.component';
import {HeaderComponent} from './business/view/page/portfolio/header/header.component';
import {FooterComponent} from './business/view/page/portfolio/footer/footer.component';
import {InnerBodyComponent} from './business/view/page/portfolio/inner-body/inner-body.component';
import {ContactMeDialogComponent} from './business/view/dialog/contact-me-dialog/contact-me-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {ControlPanelComponent} from './business/view/page/control-panel/control-panel.component';
import {BodyAdminComponent} from './business/view/page/control-panel/body-admin/body-admin.component';
import {HeaderAdminComponent} from './business/view/page/control-panel/header-admin/header-admin.component';
import {FooterAdminComponent} from './business/view/page/control-panel/footer-admin/footer-admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SideNavComponent} from './business/view/page/control-panel/side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {TableControlComponent} from './business/view/page/control-panel/side-nav/table-control/table-control.component';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthComponent} from './business/view/page/auth/auth.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FilterControlComponent} from './business/view/page/control-panel/side-nav/filter-control/filter-control.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {environment} from "../environment/environment";
import {VisitorDialogComponent} from './business/view/dialog/control-panel/visitor-dialog/visitor-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ScrollListenerDirective } from './business/shared/ScrollListener/scroll-listener.directive';
import { ConfirmDialogComponent } from './business/view/dialog/confirm-dialog/confirm-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {BASE_URL} from "./business/shared/base-url/base-url.const";
import {BaseUrlInterceptor} from "./business/shared/base-url/base-url.interceptor";
import {JwtModule} from "@auth0/angular-jwt";
import { NewDatePipePipe } from './business/shared/date-pipe/new-date-pipe.pipe';
import {SpinnerInterceptor} from "./business/shared/spinner/spinner.interceptor";
import { ShowSpinnerDirective } from './business/shared/spinner/show-spinner.directive';
import { SpinnerComponent } from './business/view/page/components/spinner/spinner.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import { TestComponent } from './business/view/page/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    MainComponent,
    BodyComponent,
    HeaderComponent,
    FooterComponent,
    InnerBodyComponent,
    ContactMeDialogComponent,
    ControlPanelComponent,
    BodyAdminComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    SideNavComponent,
    TableControlComponent,
    AuthComponent,
    FilterControlComponent,
    VisitorDialogComponent,
    ScrollListenerDirective,
    ConfirmDialogComponent,
    NewDatePipePipe,
    ShowSpinnerDirective,
    SpinnerComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['cg50261.tw1.ru'], // Заменено на ваш бэкенд URL без "https://" и "/api/login"
        disallowedRoutes: ['cg50261.tw1.ru/api/login']
      }
    }),
    MatMenuModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: BASE_URL,
      useValue: environment.backendURL
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: BaseUrlInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: SpinnerInterceptor
    }
  ],
  exports: [
    AsideComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
