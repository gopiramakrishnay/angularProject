import { Component, OnInit, ElementRef } from '@angular/core';
import { ShareDataService } from '../sevices/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyList = [];
  constructor(private sharedData: ShareDataService, private elRef: ElementRef, public rout: Router) {
    if (localStorage["loginSuccess"] == "false") {
      this.rout.navigate(['login']);
    }
  }

  ngOnInit() {
    this.historyList = this.sharedData.histList;
    if (!this.historyList.length) {
      this.elRef.nativeElement.children[0].children[1].style.display = "none";
    }
  }

}
