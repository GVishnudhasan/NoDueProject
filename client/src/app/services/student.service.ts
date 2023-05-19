import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const STUDENT_API = 'https://nodue-backend.onrender.com/api/student';
const UPDATE_API = 'https://nodue-backend.onrender.com/api/update-flag';

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

  updateFlag(id: String): Observable<any> {
    return this.http.put(`${UPDATE_API}/${id}`, httpOptions);
  }
}
