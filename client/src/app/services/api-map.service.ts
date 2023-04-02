import { Injectable } from '@angular/core';
import { InterfaceService } from './interface.service';

@Injectable({
  providedIn: 'root'
})

export class ApiMapService {

  constructor(private server: InterfaceService) { }

  login(data: any) {
    return this.server.apiConnect(data, '/v1/login');
  }

  faculty_signup(data: any) {
    return this.server.apiConnect(data, '/v1/faculty-signup');
  }

  student_signup(data: any) {
    return this.server.apiConnect(data, '/v1/student-signup');
  }

  request_reset_password(data: any) {
    return this.server.apiConnect(data, '/v1/request-reset-password');
  }

  newPassword(data: any) {
    return this.server.apiConnect(data, '/v1/new-password');
  }

  ValidPasswordToken(data: any) {
    return this.server.apiConnect(data, '/v1/valid-password-token');
  }
}
