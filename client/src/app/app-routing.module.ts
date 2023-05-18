import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequestresetComponent } from './components/request-reset/request-reset.component';
import { ResponseresetComponent } from './components/response-reset/response-reset.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { SelectorComponent } from './components/selector/selector.component';
import { FacultySignupComponent } from './components/faculty-signup/faculty-signup.component';
import { StudentBoardComponent } from './components/student-board/student-board.component';
import { FacultyBoardComponent } from './components/faculty-board/faculty-board.component';
import { AdminBoardComponent } from './components/admin-board/admin-board.component';
import { CourseModalComponent } from './components/course-modal/course-modal.component';
import { AdminGuard } from './helpers/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'student-signup',
    component: StudentSignupComponent,
    canActivate: [AdminGuard],
    data: { expectedRole: 'ROLE_ADMIN' },
  },
  {
    path: 'selector',
    component: SelectorComponent,
    canActivate: [AdminGuard],
    data: { expectedRole: 'ROLE_ADMIN' },
  },
  {
    path: 'request-reset',
    component: RequestresetComponent,
  },
  {
    path: 'response-reset',
    component: ResponseresetComponent,
  },
  {
    path: 'faculty-signup',
    component: FacultySignupComponent,
    canActivate: [AdminGuard],
    data: { expectedRole: 'ROLE_ADMIN' },
  },
  {
    path: 'student-board',
    component: StudentBoardComponent,
    canActivate: [AdminGuard],
    data: { expectedRole: 'ROLE_STUDENT' },
  },
  {
    path: 'faculty-board',
    component: FacultyBoardComponent,
    canActivate: [AdminGuard],
    data: { expectedRole: 'ROLE_FACULTY' },
  },
  {
    path: 'admin-board',
    component: AdminBoardComponent,
    canActivate: [AdminGuard],
    data: { expectedRole: 'ROLE_ADMIN' },
  },
  {
    path: 'add-course',
    component: CourseModalComponent,
    canActivate: [AdminGuard],
    data: { expectedRole: 'ROLE_ADMIN' },
  },
  {
    path: ' ',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
