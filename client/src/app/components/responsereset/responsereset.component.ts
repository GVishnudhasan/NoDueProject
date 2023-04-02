import { Component , OnInit } from '@angular/core'; 
import { Router} from '@angular/router';

@Component({
  selector: 'app-responsereset',
  templateUrl: './responsereset.component.html',
  styleUrls: ['./responsereset.component.css']
})
export class ResponseresetComponent implements OnInit {  

  type: string = "password" ;
  isText: boolean = true ;
  eyeIcon: string = "fa-eye-slash";

  

  constructor(private router: Router){
  }
  
goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    
  } 

  hideShowPass(){ 
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"; 
  }

    hideShowPass1(){ 
      this.isText = !this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "confirmpassword";
  

  }
}

