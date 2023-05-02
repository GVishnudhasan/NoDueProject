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
