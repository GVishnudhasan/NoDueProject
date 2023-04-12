import { Component, OnInit } from '@angular/core'; 
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';



  constructor(private fb: FormBuilder, private authService: AuthService) { } 


  ngOnInit(): void { 
    this.loginForm = this.fb.group({   
      email: ['',Validators.required] ,
      password: ['',Validators.required]
    })
  } 

  login(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    const {email, password} = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  hideShowPass(){ 
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";

  }

}
