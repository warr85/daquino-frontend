import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './../users.model';
import { UserService } from './../../../services/user.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate, CanDeactivateGuard } from './can-deactivate-guard.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [CanDeactivateGuard]
})


export class UserEditComponent implements OnInit, CanComponentDeactivate {
  public title: string;
  public email;   
  public user: User;
  public status;
  public changesSaved = false;

constructor(
  private _route: ActivatedRoute, 
  private _router: Router,	
  private _userService: UserService,  
) {
  this.title = 'Registro de usuarios';
  this.user = new User("", 1, 1, "")  ;
}

  ngOnInit() {
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
