import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../users/users.model';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {

  public token;
  public resettingPasswd;
  public passUpdated;
  public user: User;

  constructor(private _userService: UserService,
    private _route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService
  ) {
    this.token = this._authService.getToken();
    this.resettingPasswd = false;
    this.passUpdated = false;
}

  ngOnInit() {
    this.getUser();
  }

  getUser(){


    this._route.data
      .subscribe(
        (data: Data) => {
          console.log("data");
          console.log(data['user'].user);
          this.user = data['user'].user;
        }
      );

    
  }


  onResetPasswd(description: string) {
    this.resettingPasswd = true;
    console.log("user id:" + description);
    this._userService.resetUser(this.token, description).subscribe(
      response => {
        console.log(response);
        this.resettingPasswd = false;
        this.passUpdated = true;
        //this.user.iduds006.id = response.user.iduds006.id;
        //this._userService.userEdited.next(response.user);
      }
    )
    
  }

}
