import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './../users.model';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [ UserService ],
})
export class UserEditComponent implements OnInit {
  public title: string;
  public email;
  /*public user: User[] = [
    new User("ytoro", 1, 1, "13649533")
  ];*/
  @Output() userAdded = new EventEmitter<{ email:string, id: number, roles: string }>();
  public user: User;
  public status;

constructor(private _route: ActivatedRoute, private _router: Router,	private _userService: UserService) {
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
        this.userAdded.emit({email: response.email, id: response.id, roles: response.roles});;
      }
    },
    error => {
      console.log( <any>error);
    }
  );

  }

}
