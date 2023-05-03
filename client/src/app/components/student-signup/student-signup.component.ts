// import { Component, OnInit } from '@angular/core';
// import {
//   FormsModule,
//   ReactiveFormsModule,
//   FormBuilder,
//   FormGroup,
//   Validators,
//   NgForm,
// } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-student-signup',
//   templateUrl: './student-signup.component.html',
//   styleUrls: ['./student-signup.component.css'],
// })
// export class StudentSignupComponent implements OnInit {
//   RegisterStudent(studentForm: NgForm): void {
//     console.log(studentForm.value);
//   }

//   selectedBranch: string = '';
//   selectedYear: string = '';
//   selectedSemester: string = '';

//   Branches: any[] = ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'];
//   Semester: any[] = ['Odd', 'Even'];
//   Year: any[] = ['1', '2', '3', '4'];

//   type: string = 'password';
//   isText: boolean = false;
//   eyeIcon: string = 'fa-eye-slash';
//   SignUpForm: FormGroup | any;
//   submitted = false;
//   isSuccessful = false;
//   isSignUpFailed = false;
//   errorMessage = '';

//   constructor(private fb: FormBuilder, private authService: AuthService) {}

//   department: any;
//   semester: any;
//   year: any;

//   ngOnInit(): void {
//     const fb = this.fb;

//     this.SignUpForm = this.fb.group({
//       name: ['', Validators.required],
//       regno: ['', Validators.required],
//       email: ['', Validators.required],
//       department: fb.control('', [Validators.required]),
//       year: fb.control('', [Validators.required]),
//       semester: fb.control('', [Validators.required]),
//       password: ['', Validators.required],
//     });
//   }

//   onSubmit() {
//     this.submitted = true;
//     if (this.SignUpForm.invalid) {
//       return;
//     }
//     const { name, regno, email, department, year, semester, password } =
//       this.SignUpForm.value;
//     console.log(this.SignUpForm.value);

//     this.authService
//       .student_signup(name, regno, email, department, year, semester, password)
//       .subscribe({
//         next: (data) => {
//           console.log(data);
//           this.isSuccessful = true;
//           this.isSignUpFailed = false;
//         },
//         error: (err) => {
//           console.log(err)
//           this.errorMessage = err.error.message;
//           this.isSignUpFailed = true;
//         },
//       });
//   }

//   hideShowPass() {
//     this.isText = !this.isText;
//     this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
//     this.isText ? (this.type = 'text') : (this.type = 'password');
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css'],
})
export class StudentSignupComponent implements OnInit {
  Branches: any[] = ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'];
  Semester: any[] = ['Odd', 'Even'];
  Year: any[] = ['1', '2', '3', '4'];

  Departments: any[] = ["CSE", "IT", "ECE", "EEE", "MECH", "BME"];

  form: any = {
    name: "",
    regno: "",
    email: "",
    department: "",
    year: "",
    semester: "",
    password: ""
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {} 

  AlertWithSuccess(){
    Swal.fire("Thank You...",'Signup Successfully','success')
  }

  onSubmit(): void {
    const { name, regno, email, department, year, semester, password } =
      this.form;

    console.log(this.form.value);

    this.authService
      .student_signup(name, regno, email, department, year, semester, password)
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

