import { Component ,OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';




@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestresetComponent implements OnInit{ 

  type: string = "password";
  isText: boolean = false; 

  requestresetForm: FormGroup | any;
  constructor( private fb : FormBuilder){ } 

  ngOnInit(): void { 

    this.requestresetForm = this.fb.group({ 
      email: ['',Validators.required]
    })
    
  }

}
