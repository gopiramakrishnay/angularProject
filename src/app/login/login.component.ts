import { Component, OnInit, ElementRef, ViewChild, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShareDataService } from '../sevices/share-data.service';
import { TasksService } from '../sevices/tasks.service';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

@NgModule({
  imports: [
    FormControl,
    FormGroup,
    ReactiveFormsModule
  ]
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ViewChild('uname', {static: false}) uname: ElementRef;
  // @ViewChild('pass', {static: false}) pass: ElementRef;
  @ViewChild(ToastContainerDirective, {static: false}) toastCont: ToastContainerDirective;
  uname;
  pass;
  submit;
  fullForm;
  constructor(public rou: Router, private elRef: ElementRef, private sharedData: ShareDataService, private tasksService: TasksService, private toast: ToastrService) {
    this.fullForm = new FormGroup({
      uname: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.toast.overlayContainer = this.toastCont;
  }
  submitLogin() {
    var creds = {
      "uname": this.fullForm.value.uname,
      "password": this.fullForm.value.pass
    }
    this.tasksService.getCredentials(creds).subscribe(res => {
      if (res.length) {
        // this.toast.success('Login', 'Success', { timeOut: 0 });
        this.sharedData.userName = res[0].uname;
        localStorage.setItem("loginSuccess", "true");
        this.sharedData.loginText = this.elRef.nativeElement.parentElement.getElementsByClassName('loginBtn')[0].text = "LOGOUT";
        this.rou.navigate(['todoComp']);
      }
    });
  }
}