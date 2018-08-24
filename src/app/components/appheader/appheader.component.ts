import { Observable } from 'rxjs';
//import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  //isLoggedIn$: Observable<boolean>;

  constructor(
      //private authService: AuthService
    ) { }

  ngOnInit() {
   // this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    //this.authService.logout();
  }

}
