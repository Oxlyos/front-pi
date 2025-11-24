import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserData } from '../interfaces/app.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  userData: UserData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    termsAgreed: false
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSignup() {
    if (this.userData.password !== this.userData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!this.userData.termsAgreed) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    // Prepare data for API (remove confirmPassword and termsAgreed if not needed by backend)
    const { confirmPassword, termsAgreed, firstName, lastName, phoneNumber, userType, ...rest } = this.userData;

    const apiData = {
      ...rest,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      role: userType
    };

    this.authService.register(apiData).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      }
    });
  }
}
