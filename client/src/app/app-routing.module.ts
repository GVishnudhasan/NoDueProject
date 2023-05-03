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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'student-signup',
    component: StudentSignupComponent,
  },
  {
    path: 'selector',
    component: SelectorComponent,
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
  },
  {
    path: 'student-board',
    component: StudentBoardComponent,
  },
  {
    path: 'faculty-board',
    component: FacultyBoardComponent,
  },
  {
    path: 'admin-board',
    component: AdminBoardComponent,
  },
  {
    path: 'add-course',
    component: CourseModalComponent,
  },
  {
    path: '',
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
