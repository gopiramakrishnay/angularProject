declare var Isotope: any;
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatCalendar } from '@angular/material';
import { Moment } from 'moment';
import { TasksService } from '../sevices/tasks.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsClick = false;
  @ViewChild('calender', { static: false })
  calendar: MatCalendar<Moment>;
  dtNum;
  dateVal;
  dateComp;
  store;
  IsoLayout;
  IsoClass;
  wStorage = [];
  constructor(public rou: Router, private elRef: ElementRef, private taskService: TasksService) {
    if (localStorage["loginSuccess"] != "true") {
      this.rou.navigate(['login']);
    }
  }

  ngOnInit() {
    this.IsoClass = document.querySelector('.rightLayout');
    this.IsoLayout = new Isotope(this.IsoClass, {
      masonry: {
        columnWidth: 30
      }
    });
  }
  dateChanged(event) {
    this.dtNum = event.toString().split(" ")[2];
    this.dateVal = event.toString().split(" ")[0] + "," + this.dtNum;
    if (this.dtNum == 1 || this.dtNum == 21 || this.dtNum == 31)
      this.dateVal = this.dateVal + "st";
    else if (this.dtNum == 2 || this.dtNum == 22)
      this.dateVal = this.dateVal + "nd";
    else if (this.dtNum == 3 || this.dtNum == 23)
      this.dateVal = this.dateVal + "rd";
    else
      this.dateVal = this.dateVal + "th";
    this.store = this.dateVal = this.dateVal + " " + event.toString().split(" ")[1];
    let Lid = this.store.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "");
    this.taskService.getTasks(Lid).subscribe(res => {
      if (res) {
        this.wStorage.push({ "date": this.store, "storage": res.List_items });
        this.IsoLayout = new Isotope(this.IsoClass, {
          masonry: {
            columnWidth: 30
          }
        });
      }
    });
    // if(localStorage.getItem(this.store)) {
    //   // this.wStorage.push({"date": this.store, "storage": JSON.parse(localStorage.getItem(this.store))});
    // }
  }
}
