import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.getUser();

    if (!user) {
        router.navigate(['/login']);
        return false;
    }

    const requiredRole = route.data['role'];

    if (user.role === requiredRole) {
        return true;
    }

    // Redirect to correct dashboard based on user role
    if (user.role === 'professor') {
        router.navigate(['/professor-dashboard']);
    } else if (user.role === 'student') {
        router.navigate(['/student-dashboard']);
    } else {
        router.navigate(['/login']);
    }

    return false;
};
