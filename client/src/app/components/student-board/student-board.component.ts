import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { StorageService } from 'src/app/services/storage.service';
import { RequestService } from 'src/app/services/request.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-board',
  templateUrl: './student-board.component.html',
  styleUrls: ['./student-board.component.scss'],
})
export class StudentBoardComponent implements OnInit {
  subjects: any[] = [];
  status: String = '';

  constructor(
    private coursesService: CourseService,
    private storageService: StorageService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    console.log(this.storageService.getUser());
    const dept = this.storageService.getUser().department;
    const year = this.storageService.getUser().year;
    const sem = this.storageService.getUser().semester;

    this.coursesService.getCourses(dept, year, sem).subscribe({
      next: (data: any) => {
        this.subjects = data;
        console.log(this.subjects);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    const studentId = this.storageService.getUser().id;
    const courseId = this.subjects[0]._id;
    console.log(courseId, studentId)
    this.requestService.requestNoDue(courseId, studentId).subscribe({
      next: (data: any) => {
        this.status = data.status;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
