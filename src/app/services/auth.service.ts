import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'auth_token';
    private userKey = 'auth_user';

    constructor(private api: ApiService) { }

    login(credentials: any): Observable<any> {
        return this.api.post('auth/login', credentials).pipe(
            tap((response: any) => {
                if (response.token) {
                    this.setToken(response.token);
                    this.setUser(response.user);
                }
            })
        );
    }

    register(data: any): Observable<any> {
        return this.api.post('auth/register', data);
    }

    getProfile(): Observable<any> {
        return this.api.get('auth/profile');
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    setUser(user: any): void {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    getUser(): any {
        const user = localStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
