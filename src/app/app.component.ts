import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true, // Mark as standalone (Angular 14+)
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HttpClientModule,RouterModule ], // Remove CommonModule (not needed here)
  providers: [TaskService,HttpClient ] // Use default HttpClient configuration
})
export class AppComponent  {
  title = 'frontend';
  newListTitle = '';  

  constructor(private taskService: TaskService,private router: Router) { }

  onCreateList() {
    this.router.navigateByUrl('/new-list');

    if (!this.newListTitle) {
      return; // Handle empty title case (optional)
    }

    this.taskService.createList(this.newListTitle)
      .subscribe({
        next: response => { // Use 'next' property for successful response
          console.log('List created:', response);
          this.newListTitle = ''; // Clear input field (optional)
          // Handle successful list creation (e.g., display a message)
        },
        error: error => { // Use 'error' property for errors
          console.error('Error creating list:', error);
          // Handle errors (e.g., display an error message)
        }
      });
  }
}
