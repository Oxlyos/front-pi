import { Component, OnInit } from '@angular/core';
import { Professor } from '../interfaces/app.interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/app.interfaces';

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule],
  templateUrl: './professor-dashboard.component.html',
  styleUrl: './professor-dashboard.component.css'
})
export class ProfessorDashboardComponent implements OnInit {
  professor: Professor = {
    id: '',
    name: '',
    title: '',
    description: '',
    image: '',
    socialLinks: { linkedin: '#' }
  };

  myCourses: Course[] = [];

  showAnnouncementForm: boolean = false;
  newAnnouncement = {
    title: '',
    description: '',
    courseId: null as number | null
  };

  showEditProfileForm: boolean = false;
  professorProfile: Professor = { ...this.professor };
  selectedFile: File | null = null;

  showCreateCourseForm: boolean = false;
  newCourse = {
    title: '',
    description: '',
    professorIntroduction: '',
    thumbnail: '',
    videoLinks: [''],
    pdfFiles: [] as File[],
    professorId: ''
  };
  selectedThumbnail: File | null = null;
  selectedPdfs: File[] = [];

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProfessorProfile();
    this.fetchProfessorCourses();
  }

  fetchProfessorProfile(): void {
    const user = this.authService.getUser();
    if (user) {
      // Map backend fields to component fields
      this.professor = {
        ...this.professor,
        id: user.id,
        name: user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim(),
        title: user.specialization || 'Professor',
        description: user.bio || '',
        image: user.profile_image || 'assets/default-professor.png',
        socialLinks: { linkedin: '#' }
      };
      this.newCourse.professorId = user.id;
      console.log('Professor profile loaded:', this.professor);
    } else {
      // Fallback: fetch from API
      this.authService.getProfile().subscribe({
        next: (response: any) => {
          const data = response.user || response;
          this.professor = {
            ...this.professor,
            id: data.id,
            name: data.name || `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            title: data.specialization || 'Professor',
            description: data.bio || '',
            image: data.profile_image || 'assets/default-professor.png',
            socialLinks: { linkedin: '#' }
          };
          this.newCourse.professorId = data.id;
          console.log('Professor profile fetched from API:', this.professor);
        },
        error: (err: any) => console.error('Error fetching profile', err)
      });
    }
  }

  fetchProfessorCourses(): void {
    this.courseService.getMyCourses().subscribe({
      next: (response: any) => {
        // Handle response format: { success: true, courses: [...] }
        this.myCourses = response.courses || [];
        console.log('Professor courses fetched:', this.myCourses);
      },
      error: (error: any) => {
        console.error('Error fetching professor courses:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleAnnouncementForm(): void {
    this.showAnnouncementForm = !this.showAnnouncementForm;
    if (!this.showAnnouncementForm) {
      this.newAnnouncement = { title: '', description: '', courseId: null };
    }
  }

  submitAnnouncement(): void {
    if (this.newAnnouncement.title.trim() && this.newAnnouncement.description.trim() && this.newAnnouncement.courseId !== null) {
      // Only send title and description in the body (courseId is in the URL)
      const announcementData = {
        title: this.newAnnouncement.title,
        description: this.newAnnouncement.description
      };

      this.courseService.addAnnouncement(this.newAnnouncement.courseId.toString(), announcementData).subscribe({
        next: (response) => {
          console.log('Announcement created successfully:', response);
          this.toggleAnnouncementForm();
        },
        error: (error: any) => {
          console.error('Error creating announcement:', error);
          console.error('Backend error details:', error.error); // Log the actual backend response
          alert(`Failed to create announcement: ${error.error?.message || 'Unknown error'}`);
        }
      });
    } else {
      alert('Please fill in all fields and select a course.');
    }
  }

  toggleEditProfileForm(): void {
    this.showEditProfileForm = !this.showEditProfileForm;
    if (this.showEditProfileForm) {
      this.professorProfile = { ...this.professor };
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
    // Implement update profile logic
    console.log('Update profile not fully implemented yet');
    this.toggleEditProfileForm();
  }

  toggleCreateCourseForm(): void {
    this.showCreateCourseForm = !this.showCreateCourseForm;
    if (!this.showCreateCourseForm) {
      this.newCourse = {
        title: '',
        description: '',
        professorIntroduction: '',
        thumbnail: '',
        videoLinks: [''],
        pdfFiles: [] as File[],
        professorId: this.professor.id
      };
      this.selectedThumbnail = null;
      this.selectedPdfs = [];
    }
  }

  addVideoLink(): void {
    this.newCourse.videoLinks.push('');
  }

  removeVideoLink(index: number): void {
    this.newCourse.videoLinks.splice(index, 1);
  }

  onThumbnailSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedThumbnail = file;
    } else {
      this.selectedThumbnail = null;
    }
  }

  onPdfSelected(event: any): void {
    const files: FileList | null = event.target.files;
    if (files) {
      this.selectedPdfs = Array.from(files);
    } else {
      this.selectedPdfs = [];
    }
  }

  submitCourse(): void {
    if (this.newCourse.title.trim() && this.newCourse.description.trim()) {
      const formData = new FormData();
      formData.append('title', this.newCourse.title);
      formData.append('description', this.newCourse.description);
      formData.append('professor_introduction', this.newCourse.professorIntroduction);

      // Append video links
      this.newCourse.videoLinks.forEach((link) => {
        if (link.trim()) {
          formData.append('video_links', link.trim());
        }
      });

      if (this.selectedThumbnail) {
        formData.append('thumbnail', this.selectedThumbnail, this.selectedThumbnail.name);
      }

      // Append PDFs
      if (this.selectedPdfs && this.selectedPdfs.length > 0) {
        this.selectedPdfs.forEach((file) => {
          formData.append('coursePdfFiles', file, file.name);
        });
      }

      this.courseService.createCourse(formData).subscribe({
        next: (response) => {
          console.log('Course created successfully:', response);
          this.toggleCreateCourseForm();
          this.fetchProfessorCourses();
        },
        error: (error: any) => {
          console.error('Error creating course:', error);
          alert('Failed to create course. Please try again.');
        }
      });
    } else {
      alert('Please fill in at least the course title and description.');
    }
  }
}
