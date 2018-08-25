import { Component, OnInit } from '@angular/core';
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
  public user: User[] = [
    new User("ytoro", 1, 1, "13649533")
  ];
  public status;

constructor(private _route: ActivatedRoute, private _router: Router,	private _userService: UserService) {
  this.title = 'Registro de usuarios';
}

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user);
    this._userService.register(this.user).subscribe(
    response => {
      this.status = response.status;
      if ( response.status !== 'success' ) {
        this.status = 'error';
      }
    },
    error => {
      console.log( <any>error);
    }
  );

  }

}
