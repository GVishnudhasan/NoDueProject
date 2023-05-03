import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const REQUEST_API = 'http://localhost:8080/api/';
const GET_REQUESTS_API = 'http://localhost:8080/api/display-pending';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) { }

  requestNoDue(courseId: string, studentId: string, facultyId: string) {
    return this.http.post(
      REQUEST_API + 'request-nodue',
      { courseId, studentId, facultyId },
      httpOptions
    );
  }

  getPendingRequests(id: string) {
    // http://localhost:8080/api/display-pending?_id=643a6718f70de6737d222d16
    return this.http.get(`${GET_REQUESTS_API}?_id=${id}`);
  }

  getRequestStatus(courseId: string, studentId: string) {
    return this.http.get(
      REQUEST_API + courseId + '/' + studentId
    );
  };

  approveRequest(id: string) {
    return this.http.put(REQUEST_API + 'approve-request/' + id, httpOptions);
  }

  rejectRequest(id: string) {
    return this.http.put(REQUEST_API + 'reject-request/' + id, httpOptions);
  }

  updateRemarks(id: string, message: string) {
    console.log(message);
    return this.http.put(REQUEST_API + 'update-remarks/' + id,
      message,
      httpOptions
    );
  }
}
