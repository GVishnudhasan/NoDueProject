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
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

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
    'Director',
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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {}

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
          Swal.fire('Success!', 'Faculty Added Successfully', 'success');
          const roles = this.storageService.getUser().roles;

          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin-board']);
          }
          this.router.navigate(['/admin-board']);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }
}
