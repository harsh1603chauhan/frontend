
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../task.service';
@Component({
  selector: 'app-new-task',
  standalone: true,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit{
  
  constructor(private taskService: TaskService, private router: Router,private route: ActivatedRoute){ }
  listId: string='';
  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.listId=params['listId'];
        console.log(this.listId);
      }
    )

  }
  
  onCancelClick() {
    this.router.navigate(['/']); // Navigate to root path on Cancel
  } 
  createTask(title: string){
    this.taskService.createTask(title,this.listId).subscribe((newTask:any)=>{
      console.log(newTask);
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
