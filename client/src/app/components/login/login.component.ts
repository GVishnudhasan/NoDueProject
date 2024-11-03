import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  showPassword: boolean = false;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  isLoggedIn = false;
  @Output() loginEvent = new EventEmitter<boolean>();
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  email: string = '';
  name: string = ''; 

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.email = this.storageService.getUser().email;
      this.name = this.storageService.getUser().name;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        Swal.fire("Thank You...", 'Login Successfully', 'success');
        this.roles = this.storageService.getUser().roles;
        
        if (this.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin-board']);
        } else if (this.roles.includes('ROLE_FACULTY')) {
          this.router.navigate(['/faculty-board']);
        } else {
          this.router.navigate(['/student-board']);
        }
        this.loginEvent.emit(this.isLoggedIn);
      },
      error: (err) => {
        console.error('Login error:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.error?.message);
        console.error('Full error object:', err);
        this.errorMessage = err.error?.message || 'An error occurred during login';
        this.isLoginFailed = true;
        Swal.fire("Error", this.errorMessage, 'error');
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  goto(): void {
    const user_role = this.storageService.getUser().roles;
    console.log(user_role[0], user_role[0].split('_')[1].toLowerCase());
    const role = user_role[0].split('_')[1].toLowerCase();
    this.router.navigate([`/${role}-board`]);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}