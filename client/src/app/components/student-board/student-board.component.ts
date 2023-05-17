import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { StorageService } from 'src/app/services/storage.service';
import { RequestService } from 'src/app/services/request.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { StudentService } from 'src/app/services/student.service';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2';
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
    private facultyService: FacultyService,
    private studentService: StudentService,
  ) { }

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
              console.log("Faculties:", facultyData);
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
                  console.log(data)
                  subject.status = data.status;
                  subject.remarks = data.remarks;
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
    Swal.fire("Request Sent!",'The Request has been sent to the faculty successfully','success')

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

  isHoDButtonEnabled(): boolean {
    const allCoursesApproved = this.subjects.every((subject) => subject.status === 'approved');
    if (!allCoursesApproved) {
      console.log('Cannot request HoD signature as not all courses are approved');
      return false;
    }
    return true;
  }

  requestHoDSignature() {
    const studentId = this.storageService.getUser().id;
    this.studentService.updateFlag(studentId).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // downloadNoDueForm() {
  //   console.log(this.subjects)
  //   const doc = new jsPDF();
  //   const name = this.storageService.getUser().name;
  //   const regNo = this.storageService.getUser().regno;
  //   const dept = this.storageService.getUser().department;
  //   const year = this.storageService.getUser().year;
  //   const sem = this.storageService.getUser().semester;

  //   doc.setFontSize(20);
  //   doc.text(`KSR Institute For Engineering and Technology`, 40, 8);
  //   doc.setFontSize(18);
  //   doc.text(`Department of ${dept}`, 65, 15);
  //   doc.setFontSize(16);
  //   doc.text(`No Due Certificate`, 70, 23);
  //   doc.setFontSize(12);
  //   doc.text(`Name: ${name}`, 15, 30);
  //   doc.text(`Registration No.: ${regNo}`, 120, 30);
  //   // doc.text(`Department: ${dept}`, 15, 40);
  //   doc.text(`Year: ${year}`, 120, 40);
  //   doc.text(`Semester: ${sem}`, 15, 40);
  //   autoTable(doc, {
  //     head:[
  //       ["Course Name", "Course Code", "Handling Faculty", "Status", "Remarks"],
  //     ],
  //     body: this.subjects.map(subject => [
  //       subject.course_name,
  //       subject.course_code,
  //       subject.handlingFaculty,
  //       subject.status,
  //       subject.remarks
  //     ])
  //   })
  //   doc.setFontSize(10);
  //   doc.text(`-------`, 170, 215);
  //   doc.text(`HOD`, 170, 220);
  //   doc.text(`------------------`, 15, 215);
  //   doc.text(`Class Advisor`, 15, 220);
  //   doc.save(`no_due_form.pdf`);
  // }
  downloadNoDueForm() {
    console.log(this.subjects);
    const doc = new jsPDF();
    const name = this.storageService.getUser().name;
    const regNo = this.storageService.getUser().regno;
    const dept = this.storageService.getUser().department;
    const year = this.storageService.getUser().year;
    const sem = this.storageService.getUser().semester;
  
    doc.setFontSize(20);
    doc.text(`KSR Institute For Engineering and Technology`, 37, 8);
    doc.text(`Department of ${dept}`, 67, 18);
    doc.setFontSize(16);
    doc.text(`No Due Certificate`, 76, 27);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 35);
    doc.text(`Registration No.: ${regNo}`, 125, 35);
    // doc.text(`Department: ${dept}`, 15, 40);
    doc.text(`Year: ${year}`, 125, 43);
    doc.text(`Semester: ${sem}`, 20, 43);
  
    // Calculate the x and y coordinates for the table to be at the center of the page
    const tableWidth = 160;
    const startX = (doc.internal.pageSize.width - tableWidth) / 2;
    const startY = 50;
    
    autoTable(doc, {
      head: [
        ["Course Name", "Course Code", "Handling Faculty", "Status", "Remarks"],
      ],
      body: this.subjects.map((subject) => [
        subject.course_name,
        subject.course_code,
        subject.handlingFaculty,
        subject.status,
        subject.remarks,
      ]),
      startY: startY,
      margin: { top: startY + 10 },
    });
  
    doc.setFontSize(10);
    doc.text(`-------`, 170, 190);
    doc.text(`HOD`, 170, 195);
    doc.text(`------------------`, 15, 190);
    doc.text(`Class Advisor`, 15, 195);
    doc.save(`no_due_form.pdf`);
  }
  

}
