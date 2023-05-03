import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const COURSE_API = 'http://localhost:8080/api/courses';
const ADD_COURSE_API = 'http://localhost:8080/api/add-course';

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

  addCourse(
    department: string,
    year: string,
    semester: string,
    course_name: string,
    course_code: string
  ):
    Observable<any> {
    return this.http.post(ADD_COURSE_API, {
      course_name,
      course_code,
      department,
      year,
      semester
    },
      httpOptions
    );
  }
}
