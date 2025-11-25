import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { Student, Course, Announcement } from '../interfaces/app.interfaces';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  studentName: string = '';
  profileImage: string = '';
  university: string = '';
  major: string = '';
  studentDescription: string = '';

  myCourses: Course[] = [];

  progressValue: number = 0;

  newAnnouncements: Announcement[] = [];

  showEditProfileForm: boolean = false;
  studentProfile: Student = {
    id: '',
    name: '',
    email: '',
    university: '',
    major: '',
    description: '',
    profileImage: '',
    userType: 'student'
  };
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchStudentProfile();
    this.fetchStudentCourses();
    // this.fetchNewAnnouncements(); // TODO: Implement announcement fetching if API exists
    this.calculateProgress();
  }

  fetchStudentProfile(): void {
    const user = this.authService.getUser();
    if (user) {
      // Map backend fields to component fields
      this.studentProfile = {
        ...this.studentProfile,
        id: user.id,
        name: user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim(),
        email: user.email,
        university: user.university || 'Unknown University',
        major: user.major || 'Unknown Major',
        description: user.bio || '',
        profileImage: user.profile_image || 'assets/stu.png',
        userType: 'student'
      };
      this.studentName = this.studentProfile.name;
      this.profileImage = this.studentProfile.profileImage;
      this.university = this.studentProfile.university;
      this.major = this.studentProfile.major;
      this.studentDescription = this.studentProfile.description;
      console.log('Student profile loaded:', this.studentProfile);
    } else {
      // Fallback: fetch from API
      this.authService.getProfile().subscribe({
        next: (response: any) => {
          const data = response.user || response;
          this.studentProfile = {
            ...this.studentProfile,
            id: data.id,
            name: data.name || `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            email: data.email,
            university: data.university || 'Unknown University',
            major: data.major || 'Unknown Major',
            description: data.bio || '',
            profileImage: data.profile_image || 'assets/stu.png',
            userType: 'student'
          };
          this.studentName = this.studentProfile.name;
          this.profileImage = this.studentProfile.profileImage;
          this.university = this.studentProfile.university;
          this.major = this.studentProfile.major;
          this.studentDescription = this.studentProfile.description;
          console.log('Student profile fetched from API:', this.studentProfile);
        },
        error: (err: any) => console.error('Error fetching profile', err)
      });
    }
  }

  fetchStudentCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        // Handle response format: { success: true, courses: [...] }
        this.myCourses = response.courses || [];
        console.log('Student courses fetched:', this.myCourses);
        this.calculateProgress();
      },
      error: (err: any) => {
        console.error('Error fetching student courses:', err);
      }
    });
  }

  fetchNewAnnouncements(): void {
    // Placeholder
  }

  calculateProgress(): void {
    if (this.myCourses.length === 0) {
      this.progressValue = 0;
      return;
    }
    const completedCourses = this.myCourses.filter(course => course.completed).length;
    this.progressValue = (completedCourses / this.myCourses.length) * 100;
  }

  toggleCourseCompletion(courseId: number): void {
    // Logic to toggle completion
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleEditProfileForm(): void {
    this.showEditProfileForm = !this.showEditProfileForm;
    if (this.showEditProfileForm) {
      this.studentProfile = { ...this.studentProfile };
      this.selectedFile = null;
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  submitProfileChanges(): void {
    // Implement update profile logic using AuthService or a UserService if available
    // For now, just log
    console.log('Update profile not fully implemented yet');
    this.toggleEditProfileForm();
  }
}
