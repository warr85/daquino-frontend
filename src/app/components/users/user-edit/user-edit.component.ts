import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './../users.model';
import { UserService } from './../../../services/user.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate, CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [CanDeactivateGuard]
})


export class UserEditComponent implements OnInit, CanComponentDeactivate {
  public title: string;
  public email;   
  public username;
  public password;
  public user: User;
  public status;
  public token;
  public changesSaved = false;
  allowEdit = false;

constructor(
  private _route: ActivatedRoute, 
  private _router: Router,	
  private _userService: UserService,  
  private _authService: AuthService
) {
  this.title = 'Registro de usuarios';
  this.user = new User("", 1, 1, "")  ;
  this.token = this._authService.getToken();
}

  ngOnInit() {
    console.log(this._route.snapshot.queryParams);
    console.log(this._route.snapshot.fragment);
    this._route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    this._route.fragment.subscribe();
    const id = +this._route.snapshot.params['id'];
    let data = this._userService.getSingleUser(this.token, id);
    this._userService.getSingleUser(this.token, id).subscribe(
      response => {
        if (response.status === "success"){
          this.user = response.user;
        }
        console.log(response);
        console.log(this.user);
      },
      error => {
        console.log("error");
      }
    );    
  }

  
  onSubmit() {
    console.log(this.user);
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
        this.status = response.status;
        this.email = response.email;
        if ( response.status !== 'success' ) {
          this.status = 'error';
        }else{        
          this._userService.userCreated.emit(this.user);
          this.changesSaved = true;
        }
      },
      error => {
        console.log( <any>error);
      }
    );

  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    
      return confirm('Do you want to discard the changes?');

    
  }

}
