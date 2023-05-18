import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
})
export class AdminBoardComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  students: any[] = [];
  faculties: any[] = [];
  courses: any[] = [];
  name: string = '';

  ngOnInit(): void {
    this.name = this.storageService.getUser().name;
    const dept = this.storageService.getUser().department;

    this.adminService.getStudents(dept).subscribe({
      next: (data: any) => {
        this.students = data;
        console.log(data);
      },
    });

    this.adminService.getCourses(dept).subscribe({
      next: (data: any) => {
        this.courses = data;
        console.log(data);
      },
    });

    this.adminService.getFaculties(dept).subscribe({
      next: (data: any) => {
        this.faculties = data;
        console.log(data);
      },
    });
  }

  deleteStudent(student: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'The student has been removed from the Database.',
          'error'
        );
      }
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
    });
  }

  addStudent(): void {
    this.router.navigate(['/student-signup']);
  }

  addFaculty(): void {
    this.router.navigate(['/faculty-signup']);
  }

  deleteFaculty(faculty: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'The faculty has been deleted.', 'error');
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
    });
  }

  addCourse(): void {
    this.router.navigate(['/add-course']);
  }

  deleteCourse(course: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'The Course has been deleted.', 'error');
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
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(['/login']);
        // window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}