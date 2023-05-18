import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { StorageService } from 'src/app/services/storage.service';
import { RequestService } from 'src/app/services/request.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { StudentService } from 'src/app/services/student.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  name: String = '';

  constructor(
    private coursesService: CourseService,
    private storageService: StorageService,
    private requestService: RequestService,
    private facultyService: FacultyService,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.storageService.getUser());
    this.name = this.storageService.getUser().name;
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
              console.log('Faculties:', facultyData);
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
                  console.log(data);
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
  check() {
    Swal.fire({
      title: 'Congrats on getting No Dues!',
      html:
        'This Project is designed and developed by <br>' +
        '<b>G VISHNUDHASAN,<br> A RAGUL,<br> D GEETHAPRIYA <br> and K NANDHINI <br> </b> Department of Computer Science and Engineering (Batch 2021-2025) during their 2nd Year. <br>' +
        'This is a Open-Source Project. So, You can also contribute to it <a href="https://github.com/GVishnudhasan/NoDueProject">here.</a> <br><br>' +
        '<b>Loved it? Give it a star! <a href="https://github.com/GVishnudhasan/NoDueProject">here</a> </b>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
  }
  isDownloadButtonEnabled(): boolean {
    return this.subjects.every((subject) => subject.status === 'approved');
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
    Swal.fire(
      'Request Sent!',
      'The Request has been sent to the faculty successfully',
      'success'
    );

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
    const allCoursesApproved = this.subjects.every(
      (subject) => subject.status === 'approved'
    );
    if (!allCoursesApproved) {
      console.log(
        'Cannot request HoD signature as not all courses are approved'
      );
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
      },
    });
  }

  downloadNoDueForm() {
    Swal.fire({
      title: 'Congrats on getting No Dues!',
      html:
        'This Project is designed and developed by <br>' +
        '<b>G VISHNUDHASAN,<br> A RAGUL,<br> D GEETHAPRIYA <br> and K NANDHINI <br> </b> Department of Computer Science and Engineering (Batch 2021-2025) during their 2nd Year. <br>' +
        'This is a Open-Source Project. So, You can also contribute to it <a href="https://github.com/GVishnudhasan/NoDueProject">here.</a> <br><br>' +
        '<b>Loved it? Give it a star! <a href="https://github.com/GVishnudhasan/NoDueProject">here</a> </b>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });

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
    doc.text(`No Due Certificate for the Academic Year 2022-2023`, 40, 27);
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

    // autoTable(doc, {
    //   head: [
    //     ['Course Name', 'Course Code', 'Handling Faculty', 'Status', 'Remarks'],
    //   ],
    //   body: this.subjects.map((subject) => [
    //     subject.course_name,
    //     subject.course_code,
    //     subject.handlingFaculty,
    //     subject.status,
    //     subject.remarks,
    //   ]),
    //   ...['Library', 'N/A', 'Librarian', '        ', '        '],
    //   ...['Mentor', 'N/A', '           ', '        ', '        '],
    //   startY: startY,
    //   margin: { top: startY + 10 },
    // });
    autoTable(doc, {
      head: [
        ['Course Name', 'Course Code', 'Handling Faculty', 'Status', 'Remarks'],
      ],
      body: [
        ...this.subjects.map((subject) => [
          subject.course_name,
          subject.course_code,
          subject.handlingFaculty,
          subject.status,
          subject.remarks,
        ]),
        ['Library', 'N/A', 'Librarian', '        ', '        '],
        ['Mentor', 'N/A', '           ', '        ', '        '],
      ],
      startY: startY,
      margin: { top: startY + 10 },
    });

    doc.setFontSize(10);
    doc.text(`-------`, 170, 190);
    doc.text(`HOD`, 170, 195);
    doc.text(`------------------`, 15, 190);
    doc.text(`Class Advisor`, 15, 195);
    doc.save(`no_due_form_${name}.pdf`);
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
