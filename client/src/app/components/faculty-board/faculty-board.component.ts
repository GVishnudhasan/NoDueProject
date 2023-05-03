import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { StorageService } from 'src/app/services/storage.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-faculty-board',
  templateUrl: './faculty-board.component.html',
  styleUrls: ['./faculty-board.component.scss'],
})
export class FacultyBoardComponent implements OnInit {
  pendingRequests: any[] = [];
  requestIds: any[] = [];
  selectedRequest: any = null;
  form: any = { message: '' };

  constructor(
    private requestService: RequestService,
    private storageService: StorageService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    const id = this.storageService.getUser().id;
    console.log(this.storageService.getUser(), id);
    this.requestService.getPendingRequests(id).subscribe({
      next: (data: any) => {
        this.pendingRequests = data;
        this.requestIds.push(data.map((request: any) => request._id));
        console.log(this.pendingRequests);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  approveRequest(request: any): void {
    this.requestService.approveRequest(request._id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.pendingRequests = this.pendingRequests.filter(
          (r) => r._id !== request._id
        );
        this.selectedRequest = null;
      },
      error: (err) => {
        console.log(err);
      },
    });
    
    const message = this.form;
    this.requestService.updateRemarks(request._id, message).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  rejectRequest(request: any): void {
    this.requestService.rejectRequest(request._id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.pendingRequests = this.pendingRequests.filter(
          (r) => r._id !== request._id
        );
        this.selectedRequest = null;
      },
      error: (err) => {
        console.log(err);
      },
    });

    const message = this.form;
    this.requestService.updateRemarks(request._id, message).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSelect(request: any): void {
    this.selectedRequest = this.selectedRequest === request ? null : request;
  }
}
