import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const token = localStorage.getItem('auth_token');
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }

    get<T>(path: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${path}`, {
            headers: this.getHeaders(),
            params
        });
    }

    post<T>(path: string, body: any): Observable<T> {
        // For FormData, don't set Content-Type header (browser will set it with boundary)
        if (body instanceof FormData) {
            const token = localStorage.getItem('auth_token');
            let headers = new HttpHeaders();
            if (token) {
                headers = headers.set('Authorization', `Bearer ${token}`);
            }
            return this.http.post<T>(`${this.apiUrl}/${path}`, body, { headers });
        }

        return this.http.post<T>(`${this.apiUrl}/${path}`, body, {
            headers: this.getHeaders()
        });
    }

    put<T>(path: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${path}`, body, {
            headers: this.getHeaders()
        });
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}/${path}`, {
            headers: this.getHeaders()
        });
    }
}
