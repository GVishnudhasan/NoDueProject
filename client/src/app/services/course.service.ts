import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const COURSE_API = 'http://localhost:8080/api/courses';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  // http://localhost:8080/api/courses?department=CSE&year=2&semester=Even

  getCourses(dept: string, year: string, sem: string) {
    return this.http.get(`${COURSE_API}?department=${dept}&year=${year}&semester=${sem}`);
  }
}
