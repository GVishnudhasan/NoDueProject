import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit {
  Branches: any[] = ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'];
  Semester: any[] = ['Odd', 'Even'];
  Year: any[] = ['1', '2', '3', '4'];

  form: any = {
    course_name: '',
    course_code: '',
    department: '',
    year: '',
    sem: '',
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private courseService: CourseService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { course_name, course_code, department, year, sem } =
      this.form;
    console.log(this.form.value)
    this.courseService.addCourse(department, year, sem, course_name, course_code)
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
      })
  }
}
