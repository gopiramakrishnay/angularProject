import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusComponent } from './focus.component'

@NgModule({
  declarations: [FocusComponent],
  imports: [
    CommonModule
  ],
  bootstrap: [FocusComponent]
})
export class FocusModule { }
