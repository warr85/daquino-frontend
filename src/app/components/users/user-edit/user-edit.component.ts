import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './../users.model';
import { UserService } from './../../../services/user.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate, CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthService } from '../../../auth/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [CanDeactivateGuard]
})


export class UserEditComponent implements OnInit, CanComponentDeactivate {


  public title: string;
  public email; 
  

  public topics = [
  ];

  controls;
  public username;
  public password;
  public user: User;
  public status;
  public token;
  public id: number;
  public editMode = false;
  public changesSaved = false;
  allowEdit = false;
  public checked = false;

  

constructor(
  private _route: ActivatedRoute, 
  private _router: Router,	
  private _userService: UserService,  
  private _authService: AuthService
) {

  this.title = 'Registro de usuarios';
  this.user = new User("") ;
  this.token = this._authService.getToken();
}

  ngOnInit() {
       

    this._route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode =  params['id'] != null;  
          
        }
      );

      this.getRoles();

      this.user = {
        description: '',  
        id: 0,      
        topics: []
      }

     
    this._route.fragment.subscribe();
    
   if(this.editMode){     
    this._userService.getSingleUser(this.token, this.id).subscribe(
      response => {
        if (response.status === "success"){
          console.log(response.user.membership);
          this.user.description = response.user.description;
          const prueba = response.user.membership;
          this.user.topics = prueba;          
          
        }
        
      },
      error => {
        console.log("error");
      }
    );    
  }else{
    
  }
  }

  
  getRoles(){
  this._userService.getRoles(this.token).subscribe(
    response => {
      console.log(response);
      this.topics = response.topics;
      console.log(this.topics);
    }
  );
 }

 
  
  onSubmit(f: NgForm) {
    console.log(f);
    console.log(f.value);
    console.log("editmode: " + this.editMode);
    if(!this.editMode){
      this._userService.register(this.token, f.value).subscribe(
        response => {
          console.log(response);
          this.status = response.status;
          this.email = response.email;
          if ( response.status !== 'success' ) {
            this.status = 'error';
          }else{        
            this._userService.userCreated.next(response.user);
            this.changesSaved = true;
            this._router.navigate(["../"], {relativeTo: this._route});
          }
        },
        error => {
          console.log( <any>error);
        }
      );
    }else{
      console.log("esto es f.value:");
      console.log(f.value);
      this._userService.updateUser(this.token, f.value).subscribe(
        response => {
          console.log(response);
        }          
      );

    }
    

  }


  /*usernameTaken (control: FormControl): Promise<any> | Observable<any> {
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

  }*/

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    
      return confirm('Do you want to discard the changes?');

    
  }

}
