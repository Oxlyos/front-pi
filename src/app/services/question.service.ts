import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private api: ApiService) { }

    getAllQuestions(): Observable<any> {
        return this.api.get('questions');
    }

    getQuestion(id: string): Observable<any> {
        return this.api.get(`questions/${id}`);
    }

    createQuestion(data: any): Observable<any> {
        return this.api.post('questions', data);
    }

    replyToQuestion(id: string, data: any): Observable<any> {
        return this.api.post(`questions/${id}/reply`, data);
    }
}
