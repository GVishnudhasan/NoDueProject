import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;

  onLoginEvent(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }
}