// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-faculty-signup',
//   templateUrl: './faculty-signup.component.html',
//   styleUrls: ['./faculty-signup.component.css'],
// })
// export class FacultySignupComponent implements OnInit {
//   RegisterStudent(studentForm: NgForm): void {
//     console.log(studentForm.value);
//   }

//   selectedBranch: string = '';
//   selectedDesignation: string = '';

//   Branches: any[] = ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'];
//   Designations: any[] = [
//     'Assistant Professor',
//     'Associate Professor',
//     'Head of the Department',
//     'Director',
//   ];

//   type: string = 'password';
//   isText: boolean = false;
//   eyeIcon: string = 'fa-eye-slash';
//   SignUpForm: FormGroup | any;
//   submitted = false;
//   isSuccessful = false;
//   isSignUpFailed = false;
//   errorMessage = '';

//   constructor(private fb: FormBuilder, private authService: AuthService) {}

//   ngOnInit(): void {
//     const fb = this.fb;

//     this.SignUpForm = this.fb.group({
//       name: ['', Validators.required],
//       facultyid: ['', Validators.required],
//       email: ['', Validators.required],
//       dateOfJoining: ['', Validators.required],
//       department: fb.control('', [Validators.required]),
//       designation: fb.control('', [Validators.required]),
//       password: ['', Validators.required],
//     });
//   }

//   onsubmit() {
//     this.submitted = true;
//     if (this.SignUpForm.invalid) {
//       return;
//     }
//     const { name, facultyid, email, dateOfJoining, department, designation, password } =
//       this.SignUpForm.value;
//     console.log(this.SignUpForm.value);

//     this.authService
//       .faculty_signup(name, facultyid, email, dateOfJoining, department, designation, password)
//       .subscribe({
//         next: (data) => {
//           console.log(data);
//           this.isSuccessful = true;
//           this.isSignUpFailed = false;
//         },
//         error: (err) => {
//           console.log(err);
//           this.errorMessage = err.error.message;
//           this.isSignUpFailed = true;
//         }
//       });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';

@Component({
  selector: 'app-faculty-signup',
  templateUrl: './faculty-signup.component.html',
  styleUrls: ['./faculty-signup.component.css'],
})
export class FacultySignupComponent implements OnInit {
  Departments: any[] = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'BME'];
  Designations: any[] = [
    'Assistant Professor',
    'Associate Professor',
    'Head of the Department',
    'Director'
  ];

  form: any = {
    name: '',
    facultyid: '',
    email: '',
    dateOfJoining: '',
    department: '',
    designation: '',
    password: '',
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const {
      name,
      facultyid,
      email,
      dateOfJoining,
      department,
      designation,
      password,
    } = this.form;

    console.log(this.form.value);

    this.authService
      .faculty_signup(
        name,
        facultyid,
        email,
        dateOfJoining,
        department,
        designation,
        password
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }
}
