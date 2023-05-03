import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { StorageService } from 'src/app/services/storage.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit {
  Branches: any[] = ['CSE', 'EEE', 'IT', 'Mech', 'ECE', 'BME'];
  Semester: any[] = ['Odd', 'Even'];
  Year: any[] = ['1', '2', '3', '4'];
  faculties: any[] = [];
  form: any = {
    course_name: '',
    course_code: '',
    department: '',
    year: '',
    semester: '',
    faculty: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private storageService: StorageService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    const dept = this.storageService.getUser().department;
    console.log(dept);

    // this.adminService.getFaculties(dept).subscribe({
    //   next: (data: any) => {
    //     this.faculties = data;
    //     console.log(data)
    //   }
    // })
    this.adminService.getFaculties(dept).subscribe({
      next: (data: any) => {
        this.faculties = data.map((faculty: any) => {
          return {
            _id: faculty._id,
            name: faculty.name
          };
        });
        console.log(this.faculties);
      }
    });

  }

  onSubmit(): void {
    const { course_name, course_code, department, year, semester, faculty } =
      this.form;
    console.log(this.form)
    this.courseService.addCourse(department, year, semester, course_name, course_code, faculty)
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
