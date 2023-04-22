import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { StorageService } from 'src/app/services/storage.service';
import { RequestService } from 'src/app/services/request.service';
import { FacultyService } from 'src/app/services/faculty.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-board',
  templateUrl: './student-board.component.html',
  styleUrls: ['./student-board.component.scss'],
})
export class StudentBoardComponent implements OnInit {
  subjects: any[] = [];
  handlingFacultyNames: any[] = [];
  status: String = '';

  constructor(
    private coursesService: CourseService,
    private storageService: StorageService,
    private requestService: RequestService,
    private facultyService: FacultyService
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

        // Get handling faculty names for each subject
        for (const subject of this.subjects) {
          const facultyId = subject.handlingFacultyName;

          // Use forkJoin to make multiple HTTP requests in parallel
          this.facultyService.getFaculty(facultyId).subscribe({
            next: (facultyData: any) => {
              // Push the handling faculty name to the array with the corresponding subject id
              this.handlingFacultyNames.push({
                subjectId: subject._id,
                facultyName: facultyData.name,
              });

              // If we have collected all the handling faculty names, assign it to the subject
              if (this.handlingFacultyNames.length === this.subjects.length) {
                for (let i = 0; i < this.subjects.length; i++) {
                  const subjectId = this.subjects[i]._id;
                  const handlingFacultyName = this.handlingFacultyNames.find(
                    (hf) => hf.subjectId === subjectId
                  )?.facultyName;
                  this.subjects[i].handlingFaculty = handlingFacultyName;
                }
              }
              console.log(this.subjects);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }

        // Get request status for each course and assign it to the status variable
        for (const subject of this.subjects) {
          const studentId = this.storageService.getUser().id;
          const courseId = subject._id;
          try {
            this.requestService
              .getRequestStatus(courseId, studentId)
              .subscribe({
                next: (data: any) => {
                  subject.status = data;
                },
                error: (err) => {
                  console.log(err);
                  subject.status = 'Not requested';
                },
              });
          } catch (err) {
            console.log(err);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit(subjectId: String) {
    const studentId = this.storageService.getUser().id;
    const course = this.subjects.find((c) => c._id === subjectId);
    if (!course) {
      console.log('Course not found');
      return;
    }
    console.log(course);
    const courseId = course._id;
    const facultyId = course.handlingFacultyName;
    console.log(courseId, studentId, facultyId);

    this.requestService.requestNoDue(courseId, studentId, facultyId).subscribe({
      next: (data: any) => {
        const subjectIndex = this.subjects.findIndex(
          (s) => s._id === subjectId
        );
        if (subjectIndex !== -1) {
          this.subjects[subjectIndex].status = data.status;
        }
        this.status = data.status;
        console.log(this.status, data, data.status);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
