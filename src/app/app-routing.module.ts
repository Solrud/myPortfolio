import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainComponent} from "./business/view/page/main/main.component";
import {ControlPanelComponent} from "./business/view/page/control-panel/control-panel.component";

const routes: Routes = [{path: '', component: MainComponent},
                        {path: 'first-test-page', component: ControlPanelComponent},
                        {path: '**', redirectTo: '/', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
