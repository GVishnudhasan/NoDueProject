import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const REQUEST_API = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  requestNoDue(courseId: string, studentId: string) {
    return this.http.post(
      REQUEST_API + 'request-nodue',
      { courseId, studentId },
      httpOptions
    );
  }
}
