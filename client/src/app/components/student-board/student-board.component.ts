import { Component, OnInit } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-board',
  templateUrl: './student-board.component.html',
  styleUrls: ['./student-board.component.scss']
})
export class StudentBoardComponent implements OnInit {

  subjects: any[] = [
    { name: 'Mathematics', faculty: 'John Doe' },
    { name: 'Science', faculty: 'Jane Doe' },
    { name: 'History', faculty: 'Bob Smith' }
  ];
  noDueRequest = {
    subject: '',
    reason: ''
  };
  showModal = false;

  constructor() { }

  ngOnInit(): void {
  }

  // showNoDueRequestModal(subjects: { name: string; }): void {
  //   this.noDueRequest.subject = subjects.name;
  //   this.showModal = true;
  // }

  closeModal(): void {
    this.showModal = false;
  }

  submitNoDueRequest(): void {
    // Submit the no due request to the server
    this.showModal = false;
  }

}
