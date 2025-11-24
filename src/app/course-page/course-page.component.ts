import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../services/course.service';
import { CourseDetails, Video, Assignment, File, Professor } from '../interfaces/app.interfaces';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})
export class CoursePageComponent implements OnInit {
  courseId: string | null = null;
  courseDetails: CourseDetails = { id: '', title: '', description: '' };
  videos: Video[] = [];
  assignments: Assignment[] = [];
  files: File[] = [];
  professor: Professor = { id: '', name: '', description: '', image: '', title: '', socialLinks: {} };

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.fetchCourseData(this.courseId);
    }
  }

  fetchCourseData(courseId: string): void {
    this.courseService.getCourse(courseId).subscribe({
      next: (data) => {
        console.log('Course data fetched:', data);
        // Assuming the API returns a populated course object
        // Map the response to the component properties
        this.courseDetails = data;
        this.videos = data.videos || [];
        this.assignments = data.assignments || [];
        this.files = data.files || [];
        if (data.professor) {
          this.professor = data.professor;
        }
      },
      error: (error: any) => {
        console.error('Error fetching course data:', error);
      }
    });
  }
}
