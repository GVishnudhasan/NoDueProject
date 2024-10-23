import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://nodue-backend.onrender.com/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  student_signup(
    name: String,
    regno: String,
    email: String,
    department: String,
    year: String,
    semester: String,
    password: String
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'student-signup',
      {
        name,
        regno,
        email,
        department,
        year,
        semester,
        password,
      },
      httpOptions
    );
  }

  faculty_signup(
    name: String,
    facultyid: String,
    email: String,
    dateOfJoining: Date,
    department: String,
    designation: String,
    password: String
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'faculty-signup',
      {
        name,
        facultyid,
        email,
        dateOfJoining,
        department,
        designation,
        password,
      },
      httpOptions
    );
  }

   logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth-token');
  }
}
