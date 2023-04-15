import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-faculty-board',
  templateUrl: './faculty-board.component.html',
  styleUrls: ['./faculty-board.component.scss'],
})
export class FacultyBoardComponent implements OnInit {
  pendingRequests: any[] = [];
  selectedRequest: String = '';

  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.requestService.getPendingRequests().subscribe({
      next: (data: any) => {
        this.pendingRequests = data;
        console.log(this.pendingRequests);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  approveRequest(request: Request): void {
    // this.requestService.approveRequest(request._id).subscribe(() => {
    //   this.pendingRequests = this.pendingRequests.filter((r) => r !== request);
    //   this.selectedRequest = null;
    // });
    console.log("Approve request");
  }

  rejectRequest(request: Request): void {
    // this.requestService.rejectRequest(request._id).subscribe(() => {
    //   this.pendingRequests = this.pendingRequests.filter((r) => r !== request);
    //   this.selectedRequest = null;
    // });
    console.log("Reject request");
  }

  onSelect(request: any): void {
    this.selectedRequest = this.selectedRequest === request ? null : request;
  }
}
