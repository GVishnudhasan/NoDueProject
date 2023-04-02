import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';
@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css'],
})
export class StudentSignupComponent implements OnInit {
  RegisterStudent(studentForm: NgForm): void {
    console.log(studentForm.value);
  }

  selectedBranch: string = '';
  selectedYear: string = '';
  selectedSemester: string = '';

  Branches: any[] = ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'];
  Semester: any[] = ['odd', 'even'];
  Year: any[] = ['1', '2', '3', '4'];

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  SignUpForm!: FormGroup;

  form: FormGroup | any;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  userForm: FormGroup | any;
  branch: any;
  semester: any;
  year: any;

  ngOnInit(): void {
    const fb = this.fb;
    this.userForm = fb.group({
      branch: fb.control('', [Validators.required]),
      year: fb.control('', [Validators.required]),
      semester: fb.control('', [Validators.required]),
    });

    this.SignUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
