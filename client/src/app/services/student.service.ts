import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const STUDENT_API = 'http://localhost:8080/api/student';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }

  getStudent(id: String): Observable<any> {
    return this.http.get(`${STUDENT_API}/${id}`, httpOptions);
  }
}
