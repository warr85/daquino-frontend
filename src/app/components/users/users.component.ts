import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './users.model';
import { UserService } from './../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { merge } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
 
  private subscription: Subscription;
  loading: boolean;
  public token;
  public page: number;
  public users: User[];
  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _authService: AuthService
) {
     this.token = this._authService.getToken();
     this.page = 1;
  }

  ngOnInit() {
    
    this.loading = true;  
    this.getAllUsers();   

    this._userService.userCreated.subscribe(
      (user: User) => {
        console.log(user);
        this.users.push(user);
      }
    );
  }

  getAllUsers(){
    console.log(this._route.params);
    this._route.queryParams.subscribe(params => {
      this.page = +params['page'];
      console.log("params: " + params);
      console.log(params);
      console.log(this.page);
      if (!this.page) this.page = 1;

      this.subscription = this._userService.getUsers(this.token, this.page).subscribe(
        response => {
          console.log(response);
          if (response.status === "success"){
            this.users = response.users;
            this.loading = false;
          }
          console.log(this.users);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  addNew() {
    this._router.navigate(['new'], {relativeTo: this._route, queryParamsHandling:'preserve'})
  }

  nextPage() {
    this._router.navigate(['/security/users'], { queryParams: { page: this.page + 1 } });
  }

  previousPage() {
    this._router.navigate(['/security/users'], { queryParams: { page: this.page - 1 } });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
