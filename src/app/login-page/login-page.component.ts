import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginData } from '../interfaces/app.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  credentials: LoginData = {
    email: '',
    password: '',
    userType: 'student'
  };

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    const payload = {
      email: this.credentials.email,
      password: this.credentials.password,
      role: this.credentials.userType
    };
    this.authService.login(payload).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Navigate based on user type or to home
        if (this.credentials.userType === 'professor') {
          this.router.navigate(['/professor-dashboard']);
        } else {
          this.router.navigate(['/student-dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
