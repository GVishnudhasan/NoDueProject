import { Component, OnInit } from '@angular/core';
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
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  email: string = '';
  name: string = ''; 

  togglePasswordVisibility(){
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
        Swal.fire("Thank You...",'Login Successfully','success')
        this.roles = this.storageService.getUser().roles;
        
        if (this.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin-board']);
        } else if (this.roles.includes('ROLE_FACULTY')) {
          this.router.navigate(['/faculty-board']);
        } else {
          this.router.navigate(['/student-board']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  /*hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }*/

  reloadPage(): void {
    window.location.reload();
  }

  goto(){
    console.log(this.roles[0], this.roles[0].split('_')[1].toLowerCase());
    const role = this.roles[0].split('_')[1].toLowerCase();
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
