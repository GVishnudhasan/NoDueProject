import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StorageService } from 'src/app/services/storage.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss'],
})
export class AdminBoardComponent implements OnInit {
  constructor(
    private requestService: RequestService,
    private storageService: StorageService,
    private studentService: StudentService
  ) {}

  students: any[] = ["a", "b", "c"];
  faculties: any[] = [];
  courses: any[] = [];

  ngOnInit(): void {
    
  }

  editStudent(student: any): void {
    console.log(student);
  }

  deleteStudent(student: any): void {
    console.log(student);
  }

  addStudent(): void {
    console.log('add student');
  }

  getStudents(): void {
    console.log('get students');
  }

  addFaculty(): void {
    console.log('add faculty');
  }

  getFaculties(): void {
    console.log('get faculties');
  }

  editFaculty(faculty: any): void {
    console.log(faculty);
  }

  deleteFaculty(faculty: any): void {
    console.log(faculty);
  }

  addCourse(): void {
    console.log('add course');
  }

  editCourse(course: any): void {
    console.log(course);
  }

  deleteCourse(course: any): void {
    console.log(course);
  }
}
