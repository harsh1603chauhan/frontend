import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})


export class TaskViewComponent implements OnInit {
  lists: any[] = [];
  tasks: any[] = [];
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const listId = (params as { listId: string }).listId;
        if (listId) {
          this.taskService.getTasks(listId).subscribe((tasks: any) => {
            this.tasks = tasks;
          })
        }
      }
    )
    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
  }

  onTaskClick(task: any){
    this.taskService.complete(task).subscribe(()=>{
      console.log("Completed Successfully!");
      task.completed = !task.completed;
    })
  }



}
