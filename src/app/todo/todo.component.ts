import { Component, OnInit, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../sevices/share-data.service';
import { TasksService } from '../sevices/tasks.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, AfterViewChecked {
  dateVal: any;
  dtNum: any;
  dateComp = new Date();
  tasklist = [];
  task: string;
  store: any;

  constructor(private elRef: ElementRef, public rout: Router, private sharedData: ShareDataService, private taskService: TasksService) {
    if (localStorage["loginSuccess"] != "true") {
      this.rout.navigate(['login']);
    }
  }

  ngOnInit() {
    this.showDate();
  }
  previousDate() {
    this.dateVal = this.dateComp.setDate(this.dateComp.getDate() - 1);
    this.showDate();
  }
  nextDate() {
    this.dateVal = this.dateComp.setDate(this.dateComp.getDate() + 1);
    this.showDate();
  }
  showDate() {
    this.dtNum = this.dateComp.toString().split(" ")[2];
    this.dateVal = this.dateComp.toString().split(" ")[0] + "," + this.dtNum;
    if (this.dtNum == 1 || this.dtNum == 21 || this.dtNum == 31)
      this.dateVal = this.dateVal + "st";
    else if (this.dtNum == 2 || this.dtNum == 22)
      this.dateVal = this.dateVal + "nd";
    else if (this.dtNum == 3 || this.dtNum == 23)
      this.dateVal = this.dateVal + "rd";
    else
      this.dateVal = this.dateVal + "th";
    this.store = this.dateVal = this.dateVal + " " + this.dateComp.toString().split(" ")[1];
    this.storedTasks();
  }
  storedTasks() {
    this.tasklist = [];
    let Lid = this.store.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "");
    // if (localStorage.getItem(this.store)) {
    //   JSON.parse(localStorage.getItem(this.store)).forEach(element => {
    //     this.tasklist.push({ "Message": element.Message, "Status": element.Status });
    //   });
    // }
    this.taskService.getTasks(Lid).subscribe(res => {
      if (res) {
        this.tasklist = res.List_items;
      }
    });
  }
  addTask() {
    if (this.tasklist.length >= 5) {
      alert("Tasks not allowed");

    } else if (!this.task) {
      alert("Please Enter the Task");
    } else if (this.tasklist.indexOf(this.task) > -1) {
      alert("Duplicate Task Not Allowed");
    } else {
      this.tasklist.push({ "Message": this.task, "Status": false });
      this.sharedData.insertData({ "date": this.store, "status": "added" });
      this.sharedData.insertTaskCells({ "date": this.store, "list": this.tasklist });
      // localStorage.setItem(this.store, JSON.stringify(this.tasklist));
      var payload = {
        "Lid": this.store.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, ""),
        "List_date": this.store,
        "List_items": this.tasklist
      };
      this.taskService.getTasks(payload.Lid).subscribe(res => {
        if (res) {
          this.taskService.editTask(payload.Lid, payload).subscribe();
        } else {
          this.taskService.pushTasks(payload).subscribe();
        }
      });
    }
    this.task = "";
  }
  ngAfterViewChecked() {
    this.tasklist.forEach((element, index) => {
      if (element.Status) {
        this.elRef.nativeElement.querySelector('ul').children[index].children[0].checked = true;
        this.elRef.nativeElement.querySelector('ul').children[index].children[1].style.textDecoration = "line-through";
        this.elRef.nativeElement.querySelector('ul').children[index].children[3].style.display = "none";
      }
    });
  }
  taskChecked(event: any) {
    if (event.path[0].checked) {
      event.path[1].children[3].style.display = "none";
      event.path[1].children[1].style["text-decoration"] = "line-through";
      this.tasklist[this.tasklist.findIndex(i => i.Message === event.path[1].children[1].value)].Status = true;
      this.sharedData.insertData({ "date": this.store, "status": "checked" });
    } else {
      event.path[1].children[3].style.display = "block";
      event.path[1].children[1].style["text-decoration"] = "none";
      this.tasklist[this.tasklist.findIndex(i => i.Message === event.path[1].children[1].value)].Status = false;
      this.sharedData.insertData({ "date": this.store, "status": "unchecked" });
    }
    // localStorage.setItem(this.store, JSON.stringify(this.tasklist));
    var Lid = this.store.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "");
    this.taskService.editTask(Lid, { "List_items": this.tasklist }).subscribe();
  }
  editTask(event: any) {
    event.path[1].children[1].disabled = false;
    event.path[1].children[1].focus();
  }
  taskChanged(event: any) {
    if (event.keyCode == 13 || event.type == "blur") {
      event.path[1].children[1].disabled = true;
      this.tasklist[parseInt(event.path[1].children[0].id)].Message = event.path[1].children[1].value;
      this.sharedData.insertData({ "date": this.store, "status": "changed" });
      // localStorage.setItem(this.store, JSON.stringify(this.tasklist));
      var Lid = this.store.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "");
      this.taskService.editTask(Lid, { "List_items": this.tasklist }).subscribe();
    }
  }
  deleteTask(event: any) {
    this.tasklist.splice(this.tasklist.findIndex(i => i.Message === event.path[1].children[1].value), 1);
    this.sharedData.insertData({ "date": this.store, "status": "deleted" });
    this.sharedData.insertTaskCells({ "date": this.store, "list": this.tasklist });
    // localStorage.setItem(this.store, JSON.stringify(this.tasklist));
    var Lid = this.store.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "");
    this.taskService.editTask(Lid, { "List_items": this.tasklist }).subscribe();
  }
}