import { Component } from '@angular/core'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {  

  constructor(private router: Router){
  }
  
goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
