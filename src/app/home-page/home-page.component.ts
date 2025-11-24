import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { Course } from '../interfaces/app.interfaces';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  courses: Course[] = [];
  userRole: string | null = null;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchCourses();
    const user = this.authService.getUser();
    this.userRole = user ? user.role : null;
  }

  fetchCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        console.log('Courses fetched:', this.courses);
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
