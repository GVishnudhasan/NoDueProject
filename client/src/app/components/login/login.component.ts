// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   FormControl,
//   Validators,
// } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   type: string = 'password';
//   isText: boolean = false;
//   eyeIcon: string = 'fa-eye-slash';
//   loginForm: FormGroup | any;
//   submitted = false;
//   isSuccessful = false;
//   isSignUpFailed = false;
//   errorMessage = '';
//   // router: any;
//   // toastr: any;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router,
//     private toastr: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//   }

//   login() {
//     this.submitted = true;
//     if (this.loginForm.invalid) {
//       return;
//     }
//     const { email, password } = this.loginForm.value;

//     this.authService.login(email, password).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.mToastMsg(true, "Success", "login successful.");
//         this.router.navigate(["/student-board"]);
//         this.isSuccessful = true;
//         this.isSignUpFailed = false;
//       },
//       error: (err) => {
//         console.log(err);
//         this.mToastMsg(false, "Incorrect Email or Password", "Login failed.");
//         this.errorMessage = err.error.message;
//         this.isSignUpFailed = true;
//       },
//     });
//   }

//   hideShowPass() {
//     this.isText = !this.isText;
//     this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
//     this.isText ? (this.type = 'text') : (this.type = 'password');
//   }

//   async mToastMsg(tag: boolean, title: any, message: any) {
//     await this.toastr[tag ? "success" : "error"](title, message, {
//       timeOut: 3000,
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  email: string = '';
  name: string = '';

  constructor(private authService: AuthService, private storageService: StorageService) { }

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
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });

    
  }

  reloadPage(): void {
    window.location.reload();
  }
}
