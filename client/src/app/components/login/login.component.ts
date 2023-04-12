import { Component, OnInit } from '@angular/core'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {   

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"; 

  loginForm: FormGroup | any;



  constructor(private fb: FormBuilder) { } 


  ngOnInit(): void { 
    this.loginForm = this.fb.group({   
      username: ['',Validators.required] ,
      password: ['',Validators.required]
    })

    
  } 

  hideShowPass(){ 
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";

  }

}
