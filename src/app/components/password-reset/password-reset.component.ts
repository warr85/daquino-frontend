import { Component, OnInit } from '@angular/core';
import { CanDeactivateGuard } from '../users/user-edit/can-deactivate-guard.service';
import { User } from '../users/users.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  public user: User;
  public token;
  public buttonLoading: boolean;
  public msg: string;
  public found:boolean;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.user = new User("");
    this.token = this._authService.getToken();  
    this.buttonLoading = false;
    this.found = true;
  }

  ngOnInit() {
  }


  onSubmit(f: NgForm) {
    console.log(f);
    this.buttonLoading = true;
    this._userService.searchUser(this.token, f.value.description).subscribe(
      response => {
        console.log(response);
        
        if (response.status !== 'success') {
          this.buttonLoading = false; 
          this.found = false;  
          this.msg = "Username " + f.value.description + " Not Found";
        } else {
          this.buttonLoading = false;
          this.found = true;
          console.log(response.user);                    
          this._router.navigate([response.user.id], { relativeTo: this._route });
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
