import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainComponent} from "./business/view/page/portfolio/main/main.component";
import {ControlPanelComponent} from "./business/view/page/control-panel/control-panel.component";
import {AuthComponent} from "./business/view/page/auth/auth.component";
import {AdminGuard} from "./business/guards/admin.guard";
import {TestComponent} from "./business/view/page/test/test.component";

const routes: Routes = [
            {
              path: '',
              component: MainComponent
            },
            {
              path: 'auth',
              component: AuthComponent
            },
            {
              path: 'admin',
              component: ControlPanelComponent,
              canActivate: [AdminGuard]
            },
            // {
            //   path: 'test',
            //   component: TestComponent
            // },
            {
              path: '**',
              redirectTo: '/',
              pathMatch: 'full'
            }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
