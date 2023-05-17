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
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css'],
})
export class StudentSignupComponent implements OnInit {
  Branches: any[] = ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'];
  Semester: any[] = ['Odd', 'Even'];
  Year: any[] = ['1', '2', '3', '4'];

  Departments: any[] = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'BME'];

  form: any = {
    name: '',
    regno: '',
    email: '',
    department: '',
    year: '',
    semester: '',
    password: '',
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

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
          Swal.fire('Success!', 'Student Added Successfully', 'success');
          this.roles = this.storageService.getUser().roles;

          if (this.roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin-board']);
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }
}
