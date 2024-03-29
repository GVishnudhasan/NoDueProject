import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ADMIN_API = 'https://nodue-backend.onrender.com/admin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getCourses(dept: string){
    return this.http.get(`${ADMIN_API}/courses?department=${dept}`);
  }

  getStudents(dept: string){
    return this.http.get(`${ADMIN_API}/students?department=${dept}`);
  }

  getFaculties(dept: string){
    return this.http.get(`${ADMIN_API}/faculties?department=${dept}`);
  }

  deleteStudent(id: string){
    return this.http.delete(`${ADMIN_API}/delete-student/${id}`);
  }

  deleteFaculty(id: string){
    return this.http.delete(`${ADMIN_API}/delete-faculty/${id}`);
  }

  deleteCourse(id: string){
    return this.http.delete(`${ADMIN_API}/delete-course/${id}`);
  }
}
