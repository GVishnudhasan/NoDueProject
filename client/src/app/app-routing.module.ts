import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequestresetComponent } from './components/requestreset/requestreset.component';
import { ResponseresetComponent } from './components/responsereset/responsereset.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { SelectorComponent } from './components/selector/selector.component';
import { FacultySignupComponent } from './components/faculty-signup/faculty-signup.component';

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
