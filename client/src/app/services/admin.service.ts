import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ADMIN_API = 'http://localhost:8080/admin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getCourses(dept: string){
    return this.http.get(`${ADMIN_API}/courses?department=${dept}`)
  }

  getStudents(dept: string){
    return this.http.get(`${ADMIN_API}/students?department=${dept}`)
  }
  getFaculties(dept: string){
    return this.http.get(`${ADMIN_API}/faculties?department=${dept}`)
  }
}
