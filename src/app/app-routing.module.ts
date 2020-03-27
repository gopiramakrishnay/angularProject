import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { HistoryComponent } from './history/history.component';
import { FocusComponent } from './focus/focus.component';
import { MapsComponent } from './maps/maps.component';
import { LeafsComponent } from './leafs/leafs.component';
import { SettingsComponent } from './settings/settings.component';
import { ChpassComponent } from './settings/chpass/chpass.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'todoComp', component: TodoComponent},
  {path: 'historyComp', component: HistoryComponent},
  {path: 'focusComp', component: FocusComponent},
  {path: 'mapComp', component: MapsComponent},
  {path: 'leafMapComp', component: LeafsComponent},
  {path: 'settingsComp', component: SettingsComponent,
    children: [
      {path: 'chpassComp', component: ChpassComponent}
    ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
