import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterfaceService {
  constructor(private http: HttpClient, private router: Router) {}

  apiConnect(data: any, url: string) {
    return this.http
      .post(environment.appurl + url, data, { headers: this.getHeaders() })
      .pipe(
        tap(
          (res: any) => {
            return res;
          },
          (err: any) => {
            try {
              if (err instanceof HttpErrorResponse) {
                throw new Error(err.message);
              }
              return err.message;
            } catch (e) {
              console.log(e);
            }
          }
        )
      );
  }

  getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: '',
    });
    return headers;
  }
}
