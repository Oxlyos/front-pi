import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LandingPageService } from './landing-page.service';
import { CourseService } from '../services/course.service';
import { Testimonial, Professor, Course } from '../interfaces/app.interfaces';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit, OnDestroy {

  originalTestimonials: Testimonial[] = [];
  professors: Professor[] = [];
  courses: Course[] = [];
  testimonials: Testimonial[] = [];
  currentSlideIndex = 0;
  intervalId: any;
  itemsPerSlide = 3;
  isTransitioning = true;

  constructor(
    private landingPageService: LandingPageService,
    private courseService: CourseService
  ) { }

  ngOnInit() {

    //testimonials function
    this.landingPageService.getTestimonials().subscribe({
      next: (data: Testimonial[]) => {
        this.originalTestimonials = data;
        const lastClones = this.originalTestimonials.slice(-this.itemsPerSlide);
        const firstClones = this.originalTestimonials.slice(0, this.itemsPerSlide);
        this.testimonials = [...lastClones, ...this.originalTestimonials, ...firstClones];

        this.currentSlideIndex = this.itemsPerSlide;
        this.startSlideShow();
      },
      error: (error: any) => {
        console.error('Error fetching testimonials from service:', error);
      }
    });

    //our professors function
    this.landingPageService.getProfessors().subscribe({
      next: (data: Professor[]) => {
        this.professors = data;
      },
      error: (error: any) => {
        console.error('Error fetching professors from service:', error);
      }
    });

    //courses function
    this.courseService.getAllCourses().subscribe({
      next: (data: any) => {
        // Assuming API returns an array of courses directly or wrapped
        this.courses = Array.isArray(data) ? data : data.courses || [];
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);
      }
    });

  }

  ngOnDestroy() {
    this.stopSlideShow();
  }

  startSlideShow() {
    this.intervalId = setInterval(() => {
      this.currentSlideIndex++;
      this.checkSlidePosition();
    }, 3000);
  }

  stopSlideShow() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index + this.itemsPerSlide;
    this.resetSlideShow();
  }

  checkSlidePosition() {
    // If we've moved past the last original testimonial (into the cloned first ones)
    if (this.currentSlideIndex >= this.originalTestimonials.length + this.itemsPerSlide) {
      this.setTransition(false); // Disable transition for instant jump
      this.currentSlideIndex = this.itemsPerSlide; // Instantly jump back to the first original testimonial
      setTimeout(() => this.setTransition(true), 50); // Re-enable transition after a short delay
    }
    // If we've moved before the first original testimonial (into the cloned last ones)
    else if (this.currentSlideIndex < this.itemsPerSlide) {
      this.setTransition(false); // Disable transition for instant jump
      this.currentSlideIndex = this.originalTestimonials.length + this.itemsPerSlide - 1; // Instantly jump back to the last original testimonial
      setTimeout(() => this.setTransition(true), 50); // Re-enable transition after a short delay
    }
  }

  setTransition(enable: boolean) {
    this.isTransitioning = enable;
  }

  resetSlideShow() {
    this.stopSlideShow();
    this.startSlideShow();
  }

}
