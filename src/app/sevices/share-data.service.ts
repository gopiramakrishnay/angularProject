import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ShareDataService {
  histList = [];
  loginText;
  tasksCell = [];
  userName;
  constructor() { 
    if(localStorage["loginSuccess"] == "true"){
      this.loginText = "LOGOUT";
    } else {
      this.loginText = "LOGIN";
    }
  }
  insertData(data){
    this.histList.push(data);
  }
  insertTaskCells(data) {
    if(!this.tasksCell.some(e => e.date === data.date)) {
      this.tasksCell.push(data); 
    } else {
      this.tasksCell.splice(this.tasksCell.findIndex(e => e.date === data.date), 1);
      this.tasksCell.push(data);
    }
  }
}
