import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const FACULTY_API = 'http://localhost:8080/api/faculty';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  constructor(private http: HttpClient) {}

  getFaculty(id: String): Observable<any> {
    // return this.http.get(FACULTY_API + id, httpOptions);
    return this.http.get(`${FACULTY_API}/${id}`, httpOptions);
  }
}
