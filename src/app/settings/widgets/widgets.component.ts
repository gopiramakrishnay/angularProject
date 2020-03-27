import { Component, OnInit, Input } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {
  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };
  createW;
  @Input() date;
  @Input() wTask = [];
  constructor() { }

  ngOnInit() { }
  closeWidget() {

  }
  checkEdge(event) {
    // this.edge = event;
  }
}
