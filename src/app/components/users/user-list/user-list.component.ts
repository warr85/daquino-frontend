import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './../users.model';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [ UserService ]
})
export class UserListComponent implements OnInit {

  public identity;
    public token;
    public user: User[];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
  ) {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this._route.params.forEach((params: Params) => {
      let page = +params['page'];
      if (!page) page = 1;

      this._userService.getUsers(this.token, page).subscribe(
        response => {
          if (response.status === "success"){
            this.user = response.users;
          }
          console.log(this.user);
        },
        error => {
          console.log("error");
        }
      );
    });
  }


}
