import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ UserService ],
})
export class UserComponent implements OnInit {
  public title: string;
  public user: User;
  public status;

constructor(private _route: ActivatedRoute, private _router: Router,	private _userService: UserService
) {
  this.title = 'Registro de usuarios';
  this.user = new User('', '', '', '');
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
