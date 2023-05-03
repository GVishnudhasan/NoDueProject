import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
})
export class AdminBoardComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private storageService: StorageService,
    private router: Router
  ) { }

  students: any[] = [];
  faculties: any[] = [];
  courses: any[] = [];

  ngOnInit(): void {
    const dept = this.storageService.getUser().department;

    this.adminService.getStudents(dept).subscribe({
      next: (data: any) => {
        this.students = data;
        console.log(data)
      }
    })

    this.adminService.getCourses(dept).subscribe({
      next: (data: any) => {
        this.courses = data;
        console.log(data)
      }
    })

    this.adminService.getFaculties(dept).subscribe({
      next: (data: any) => {
        this.faculties = data;
        console.log(data)
      }
    })

  }

  deleteStudent(student: any): void {
    this.adminService.deleteStudent(student).subscribe({
      next: (data) => {
        console.log(data);
        // Do something on success
      },
      error: (err) => {
        console.log(err);
        // Do something on error
      },
    });
  }

  addStudent(): void {
    this.router.navigate(['/student-signup']);
  }

  addFaculty(): void {
    this.router.navigate(['/faculty-signup']);
  }

  deleteFaculty(faculty: any): void {
    this.adminService.deleteFaculty(faculty).subscribe({
      next: (data) => {
        console.log(data);
        // Do something on success
      },
      error: (err) => {
        console.log(err);
        // Do something on error
      },
    });
  }

  addCourse(): void {
    this.router.navigate(['/add-course']);
  }

  deleteCourse(course: any): void {
    this.adminService.deleteCourse(course).subscribe({
      next: (data) => {
        console.log(data);
        // Do something on success
      },
      error: (err) => {
        console.log(err);
        // Do something on error
      },
    });
  }
}
