import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
import { ForumComponent } from './forum/forum.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'signup', component: SignupPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'courses/:id', component: CoursePageComponent },
    {
        path: 'student-dashboard',
        component: StudentDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'student' }
    },
    {
        path: 'professor-dashboard',
        component: ProfessorDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'professor' }
    },
    { path: 'forum', component: ForumComponent }
];
