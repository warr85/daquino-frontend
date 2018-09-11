import { Observable } from 'rxjs';
//import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  //isLoggedIn$: Observable<boolean>;
  public identity;
  public username;
  constructor(
    private _authService: AuthService
    ) { 
      this.identity = this._authService.getIdentity();
    }

  ngOnInit() {
    
    this.username = this.identity.description;
  }

  onLogout() {
    
  }

}
