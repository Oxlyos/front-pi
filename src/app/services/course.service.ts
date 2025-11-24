import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private api: ApiService) { }

    getAllCourses(): Observable<any> {
        return this.api.get('courses');
    }

    getCourse(id: string): Observable<any> {
        return this.api.get(`courses/${id}`);
    }

    getMyCourses(): Observable<any> {
        return this.api.get('courses/my-courses');
    }

    createCourse(data: any): Observable<any> {
        return this.api.post('courses', data);
    }

    addVideo(courseId: string, data: any): Observable<any> {
        return this.api.post(`courses/${courseId}/videos`, data);
    }

    addAnnouncement(courseId: string, data: any): Observable<any> {
        return this.api.post(`courses/${courseId}/announcements`, data);
    }

    addFile(courseId: string, data: any): Observable<any> {
        return this.api.post(`courses/${courseId}/files`, data);
    }

    getNewAnnouncements(): Observable<any> {
        // Placeholder endpoint
        return this.api.get('courses/announcements/new');
    }

    updateCourseCompletion(courseId: number, completed: boolean): Observable<any> {
        // Placeholder endpoint
        return this.api.post(`courses/${courseId}/completion`, { completed });
    }
}
