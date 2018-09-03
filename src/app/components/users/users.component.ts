import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './users.model';
import { UserService } from './../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
 
  private subscription: Subscription;
  
  public token;
  public users: User[];
  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _authService: AuthService
) {
     this.token = this._authService.getToken();
  }

  ngOnInit() {
    
   
    
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

      this.subscription = this._userService.getUsers(this.token, page).subscribe(
        response => {
          if (response.status === "success"){
            this.users = response.users;
          }
          console.log(this.users);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
