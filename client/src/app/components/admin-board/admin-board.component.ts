import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseModalComponent } from '../course-modal/course-modal.component';


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
    private modalService: NgbModal
  ) {}

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

  openCourseModal() {
    const modalRef = this.modalService.open(CourseModalComponent);
    modalRef.componentInstance.newCourse = { name: '', code: '', description: '' };
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteStudent(student: any): void {
    console.log(student);
  }

  addStudent(): void {
    this.router.navigate(['/student-signup']);
  }

  addFaculty(): void {
    this.router.navigate(['/student-signup']);
  }

  deleteFaculty(faculty: any): void {
    console.log(faculty);
  }

  addCourse(): void {
    console.log('add course');
  }

  deleteCourse(course: any): void {
    console.log(course);
  }
}
