import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ChpassComponent } from './chpass/chpass.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { AngularSplitModule } from 'angular-split';
import { AngularSplitModule } from 'angular-split-ng6';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';


@NgModule({
  declarations: [SettingsComponent, ChpassComponent, WidgetsComponent],
  imports: [
    CommonModule,
    MatMomentDateModule,
    MatDatepickerModule,
    AngularSplitModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularDraggableModule
  ]
})
export class SettingsModule { }
