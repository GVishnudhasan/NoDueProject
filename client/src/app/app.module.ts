import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { SelectorComponent } from './components/selector/selector.component';
import { RequestresetComponent } from './components/requestreset/requestreset.component';
import { ResponseresetComponent } from './components/responsereset/responsereset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FacultySignupComponent } from './components/faculty-signup/faculty-signup.component';
import { StudentBoardComponent } from './components/student-board/student-board.component';
import { FacultyBoardComponent } from './components/faculty-board/faculty-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentSignupComponent,
    SelectorComponent,
    RequestresetComponent,
    ResponseresetComponent,
    FacultySignupComponent,
    StudentBoardComponent,
    FacultyBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
