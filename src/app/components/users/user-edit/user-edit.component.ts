import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './../users.model';
import { UserService } from './../../../services/user.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate, CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  public id: number;
  public editMode = false;
  public changesSaved = false;
  allowEdit = false;

  edit : FormGroup;

constructor(
  private _route: ActivatedRoute, 
  private _router: Router,	
  private _userService: UserService,  
  private _authService: AuthService
) {
  this.title = 'Registro de usuarios';
  this.user = new User("", null, null, "")  ;
  this.token = this._authService.getToken();
}

  ngOnInit() {
    console.log(this._route.snapshot.queryParams);
    console.log(this._route.snapshot.fragment);
    console.log(this.user.membership);    

    this._route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode =  params['id'] != null;  
          console.log(this.editMode);
        }
      );



      this.edit = new FormGroup({
        'username' : new FormControl(null, Validators.required),
        'password' : new FormControl(null, Validators.required),
        'group': new FormControl(null, Validators.required),
        'membership' : new FormControl(null, Validators.required)
      });

    this._route.fragment.subscribe();
    
   if(this.editMode){     
    this._userService.getSingleUser(this.token, this.id).subscribe(
      response => {
        if (response.status === "success"){
          this.user = response.user;
          console.log(response);
          this.edit.setValue({
            'username' : response.user.username,
            'password' : response.user.password,
            'group': response.user.id,
            'membership': response.user.id,
          });
        }
        console.log(response);
        console.log(this.user);
      },
      error => {
        console.log("error");
      }
    );    
  }else{
    this.edit.get('username').setAsyncValidators(this.usernameTaken.bind(this));
  }
  }

  
  onSubmit() {
    console.log(this.user);
    this._userService.register(this.edit.value).subscribe(
      response => {
        console.log(response);
        this.status = response.status;
        this.email = response.email;
        if ( response.status !== 'success' ) {
          this.status = 'error';
        }else{        
          this._userService.userCreated.next(this.edit.value);
          this.changesSaved = true;
          this.edit.reset();
        }
      },
      error => {
        console.log( <any>error);
      }
    );
    

  }


  usernameTaken (control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) =>{
       this._userService.checkUsernameTaken(this.token, this.edit.get('username').value).subscribe(
        response => {
          console.log(this.edit.get('username'));  
          if(response.status === "success"){
            resolve({"usernameTaken": true});
          } else {
            resolve(null);
          }
        }
      )
    });
    return promise;

  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    
      return confirm('Do you want to discard the changes?');

    
  }

}
