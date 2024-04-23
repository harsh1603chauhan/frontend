import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnInit {
  password: string = '';
  passwordError: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  private signupSubscription: Subscription | undefined;

onSignupButtonClicked(email: string, password: string) {
  if (password.length < 8) {
    this.passwordError = 'Password must be at least 8 characters long.';
    return;
  }

  // Ensure to unsubscribe from any previous subscription to avoid memory leaks
  if (this.signupSubscription) {
    this.signupSubscription.unsubscribe();
  }

  // Assign the new subscription
  this.signupSubscription = this.authService.signup(email, password).subscribe({
    next: (res: HttpResponse<any>) => {
      console.log(res);
      this.router.navigate(['/lists']);
    },
    error: (error: any) => {
      console.error(error);
      if (error.error && error.error.errors && error.error.errors.password) {
        this.passwordError = error.error.errors.password.message;
      }
    }
  });
}

}