import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Testimonial, Professor } from '../interfaces/app.interfaces';

@Injectable({
    providedIn: 'root'
})
export class LandingPageService {

    constructor() { }

    getTestimonials(): Observable<Testimonial[]> {
        const testimonials: Testimonial[] = [
            {
                id: 1,
                name: 'Sarah Johnson',
                role: 'Computer Science Student',
                content: 'The platform has completely transformed how I learn. The courses are well-structured and the professors are incredibly knowledgeable.',
                avatar: 'assets/images/student1.jpg'
            },
            {
                id: 2,
                name: 'Michael Chen',
                role: 'Data Science Major',
                content: 'I love the flexibility of the courses. Being able to learn at my own pace while having access to high-quality resources is amazing.',
                avatar: 'assets/images/student2.jpg'
            },
            {
                id: 3,
                name: 'Emily Davis',
                role: 'Web Development Student',
                content: 'The practical projects and hands-on approach helped me build a portfolio that got me my first internship.',
                avatar: 'assets/images/student3.jpg'
            },
            {
                id: 4,
                name: 'David Wilson',
                role: 'Software Engineering Student',
                content: 'The community forum is a game-changer. Getting help from peers and professors makes complex topics much easier to understand.',
                avatar: 'assets/images/student4.jpg'
            }
        ];
        return of(testimonials);
    }

    getProfessors(): Observable<Professor[]> {
        const professors: Professor[] = [
            {
                id: '1',
                name: 'Dr. Alan Smith',
                title: 'Computer Science',
                image: 'assets/images/professor1.jpg',
                description: 'Expert in Artificial Intelligence and Machine Learning with 15 years of teaching experience.',
                socialLinks: { linkedin: 'https://linkedin.com' }
            },
            {
                id: '2',
                name: 'Prof. Sarah Williams',
                title: 'Web Technologies',
                image: 'assets/images/professor2.jpg',
                description: 'Full-stack developer and educator passionate about modern web frameworks and cloud computing.',
                socialLinks: { linkedin: 'https://linkedin.com' }
            },
            {
                id: '3',
                name: 'Dr. James Brown',
                title: 'Data Science',
                image: 'assets/images/professor3.jpg',
                description: 'Data scientist and researcher specializing in big data analytics and visualization.',
                socialLinks: { linkedin: 'https://linkedin.com' }
            }
        ];
        return of(professors);
    }
}
