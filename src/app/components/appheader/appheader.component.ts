import { Observable } from 'rxjs';
//import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

 public identity;
 public username;

  constructor(
      private _authService: AuthService
    ) { 
      this.identity = this._authService.getIdentity();
    }

  ngOnInit() {
    this.username= this.identity.description;
  }

  onLogout() {
    
  }

}
