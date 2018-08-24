import { Observable } from 'rxjs';
//import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  //isLoggedIn$: Observable<boolean>;

  constructor(
    //private authService: AuthService
    ) { }

  ngOnInit() {
    //this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    //this.authService.logout();
  }

}
