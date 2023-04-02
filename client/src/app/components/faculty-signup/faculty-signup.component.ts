import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-faculty-signup',
  templateUrl: './faculty-signup.component.html',
  styleUrls: ['./faculty-signup.component.css'],
})
export class FacultySignupComponent implements OnInit {
  RegisterStudent(studentForm: NgForm): void {
    console.log(studentForm.value);
  }

  selectedBranch: string = '';
  selectedDesignation: string = '';

  Branches: any[] = ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'];
  Designations: any[] = [
    'Assistant Professor',
    'Associate Professor',
    'Head of the Department',
    'Director',
    'Principal',
  ];

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  faculty_signup!: FormGroup;

  form: FormGroup | any;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  userForm: FormGroup | any;
  branch: any;
  designation: any;

  ngOnInit(): void {
    const fb = this.fb;
    this.userForm = fb.group({
      branch: fb.control('', [Validators.required]),
      designation: fb.control('', [Validators.required]),
    });

    this.faculty_signup = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
    });
  }
}
