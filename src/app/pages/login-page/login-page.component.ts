import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Observer } from 'rxjs';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }




  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: (res: HttpResponse<any>) => {
        // Check if the response status is 200 (OK)
        if (res.status === 200) {
          // Login successful, navigate to the lists page
          this.router.navigate(['/lists']);
        } else {
          // Handle unexpected response status (e.g., 400 Bad Request)
          console.error('Unexpected response status:', res.status);
          // Display an error message to the user
          // You can customize this error message based on the response status
        }
      },
      error: (error: any) => {
        // Handle HTTP error responses (e.g., network error, server error)
        console.error('Login failed:', error);
        // Display an error message to the user
        // You can customize this error message based on the error type
      }
    });
  }
  


}
