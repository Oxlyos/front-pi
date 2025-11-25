import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Testimonial, Professor } from '../interfaces/app.interfaces';
import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})
export class LandingPageService {

    constructor(private api: ApiService) { }

    getTestimonials(): Observable<any> {
        return this.api.get('testimonials');
    }

    getProfessors(): Observable<any> {
        return this.api.get('auth/professors');
    }
}
