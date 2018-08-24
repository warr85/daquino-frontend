import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .wrapperLogin{     
        height: 850px;
        background-color: #ecf0f5;
        z-index: 800;
        margin-left:0;
    }
  `],
  providers: [UserService]
})

export class AppComponent implements OnInit {
  public title = 'app';
  public identity;
  public token;
  public logged = false;

  constructor(private _userService: UserService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    if(this.identity != null && this.identity.sub){
			this.logged = true;
		}
  }

  ngOnInit() {
  }



  

}
