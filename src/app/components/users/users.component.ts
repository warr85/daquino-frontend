import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './users.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ ]
})
export class UsersComponent implements OnInit {
 
  public identity;
    public token;
    public users: User[];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
  ) {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
  }

  ngOnInit() {
    
    if(this.identity === null && !this.identity.sub){
			this._router.navigate(["/login"]);
    }
    
    this.getAllUsers();   

    this._userService.userCreated.subscribe(
      (user: User) => {
        this.users.push(user);
      }
    );
  }

  getAllUsers(){
    this._route.params.forEach((params: Params) => {
      let page = +params['page'];
      if (!page) page = 1;

      this._userService.getUsers(this.token, page).subscribe(
        response => {
          if (response.status === "success"){
            this.users = response.users;
          }
          console.log(this.users);
        },
        error => {
          console.log("error");
        }
      );
    });
  }

}
