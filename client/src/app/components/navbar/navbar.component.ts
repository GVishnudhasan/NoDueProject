import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isNavbarOpen = false;
    isLoggedIn = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
    }

    toggleNavbar() {
        this.isNavbarOpen = !this.isNavbarOpen;
    }
}
