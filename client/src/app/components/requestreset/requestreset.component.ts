import { Component ,OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';




@Component({
  selector: 'app-requestreset',
  templateUrl: './requestreset.component.html',
  styleUrls: ['./requestreset.component.css']
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
