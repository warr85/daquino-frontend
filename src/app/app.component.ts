import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

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
  providers: [AuthService]
})

export class AppComponent implements OnInit {
  public title = 'app';
  public identity;
  public token;
  public logged = false;

  constructor(private _authService: AuthService) {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();

    if(this.identity != null && this.identity.sub){
			this.logged = true;
		}
  }

  ngOnInit() {
  }



  

}
