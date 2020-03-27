import { Component, OnInit, Input } from '@angular/core';
import { ShareDataService } from '../sevices/share-data.service';
import { TasksService } from '../sevices/tasks.service';

@Component({
  selector: 'app-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.scss']
})
export class FocusComponent implements OnInit {
  @Input() taskCell;
  @Input() taskDate;
  focusTasks = [];
  constructor(private sharedData: ShareDataService, private taskService: TasksService) { }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(res => {
      res.forEach(lis => {
        this.focusTasks.push({
          "date":lis.List_date,
          "list":lis.List_items
        });
      });
    });
    // this.focusTasks = this.sharedData.tasksCell;
  }

}
