import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShareDataService } from '../../sevices/share-data.service';
import { TasksService } from '../../sevices/tasks.service';

@NgModule({
  imports: [
    FormControl,
    FormGroup,
    ReactiveFormsModule
  ]
})

@Component({
  selector: 'app-chpass',
  templateUrl: './chpass.component.html',
  styleUrls: ['./chpass.component.scss']
})
export class ChpassComponent implements OnInit {
  chForm;
  Opass;
  Npass;
  Copass;
  constructor(public rou: Router, private sharedData: ShareDataService, private taskService: TasksService) {
    this.chForm = new FormGroup({
      Opass: new FormControl('', Validators.required),
      Npass: new FormControl('', Validators.required),
      Copass: new FormControl('', Validators.required)
    });
    this.Opass = localStorage.pass;
  }

  ngOnInit() {
  }
  changeSubmit() {
    if (this.chForm.value.Npass == this.chForm.value.Copass) {
      this.taskService.getCredentials({ "uname": this.sharedData.userName, "password": this.chForm.value.Opass }).subscribe(res => {
        if (res) {
          let payload = {
            "id": this.sharedData.userName,
            "uname": this.sharedData.userName,
            "password": this.chForm.value.Npass
          };
          this.taskService.changePassword(this.sharedData.userName, payload).subscribe(res => {
            if (res) {
              location.reload();
            }
          });
        }
      })
      // localStorage.pass = this.chForm.value.Npass;
    }
  }
}
