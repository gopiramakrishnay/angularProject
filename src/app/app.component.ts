import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from './sevices/share-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proj';
  constructor(public rout: Router, private sharedData: ShareDataService, private elRef: ElementRef) {
    localStorage.setItem("loginSuccess", "false");
    this.rout.navigate(['login']);
  }
  loginAction(event: any) {
    this.sharedData.loginText = "LOGIN";
    this.elRef.nativeElement.children[0].getElementsByClassName('loginBtn')[0].text = "LOGIN";
    localStorage.setItem("loginSuccess", "false");
  }
}
