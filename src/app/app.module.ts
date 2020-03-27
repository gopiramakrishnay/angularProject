import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TasksService } from '../app/sevices/tasks.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule,ToastContainerModule } from 'ngx-toastr';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
// import { IsotopeModule } from 'ngx-isotope';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { FocusModule } from './focus/focus.module';
import { MapsComponent } from './maps/maps.component';
import { LeafsComponent } from './leafs/leafs.component';
import { SettingsModule } from './settings/settings.module';
// import { ChpassComponent } from './settings/chpass/chpass.component';
// import { WidgetsComponent } from './settings/widgets/widgets.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoginComponent,
    HistoryComponent,
    MapsComponent,
    LeafsComponent
    // IsotopeModule
  ],
  imports: [
    FocusModule,
    SettingsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    ToastNoAnimationModule.forRoot()
  ],
  providers: [TasksService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
