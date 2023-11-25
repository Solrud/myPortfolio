import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainComponent} from "./business/view/page/main/main.component";
import {ControlPanelComponent} from "./business/view/page/control-panel/control-panel.component";
import {LizPageComponent} from "./business/view/page-liz/liz-page/liz-page.component";

const routes: Routes = [{path: '', component: MainComponent},
                        {path: 'admin', component: ControlPanelComponent},
                        {path: 'its-me', component: LizPageComponent},
                        {path: '**', redirectTo: '/', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
