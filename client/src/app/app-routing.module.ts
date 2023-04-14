import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequestresetComponent } from './components/requestreset/requestreset.component';
import { ResponseresetComponent } from './components/responsereset/responsereset.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { SelectorComponent } from './components/selector/selector.component';
import { FacultySignupComponent } from './components/faculty-signup/faculty-signup.component';
import { StudentBoardComponent } from './components/student-board/student-board.component';
import { FacultyBoardComponent } from './components/faculty-board/faculty-board.component';

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
    path: 'requestreset',
    component: RequestresetComponent,
  },
  {
    path: 'responsereset',
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
