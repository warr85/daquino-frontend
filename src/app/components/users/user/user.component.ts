import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../users.model';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public token;
  public user: User;
  resettingPasswd: boolean;
  passUpdated: boolean;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private router: Router,
              private _authService: AuthService
            ) {
              this.token = this._authService.getToken();
              this.resettingPasswd = false;
              this.passUpdated = false;
  }

  ngOnInit() {
    
   
    
    this.getUser();

    
  }

  getUser(){


    this._route.data
      .subscribe(
        (data: Data) => {
          console.log("data");
          console.log(data['user'].user);
          this.user = data['user'].user;
        }
      );

    
  }

  onDisable(id: number) {
    console.log("user id:" + id);
    this._userService.disableUser(this.token, id).subscribe(
      response => {
        console.log(response);
        this.user.iduds006.id = response.user.iduds006.id;
        this._userService.userEdited.next(response.user);
      }
    )
    
  }

  onEnable(id: number) {
    console.log("user id:" + id);
    this._userService.enableUser(this.token, id).subscribe(
      response => {
        console.log(response);
        this.user.iduds006.id = response.user.iduds006.id;
        this._userService.userEdited.next(response.user);
      }
    )
    
  }

  onResetPasswd(description: string) {
    this.resettingPasswd = true;
    console.log("user id:" + description);
    this._userService.resetUser(this.token, description).subscribe(
      response => {
        console.log(response);
        this.resettingPasswd = false;
        this.passUpdated = true;
        //this.user.iduds006.id = response.user.iduds006.id;
        //this._userService.userEdited.next(response.user);
      }
    )
    
  }

    onEdit() {
      this.router.navigate(['edit'], {relativeTo: this._route, queryParamsHandling: 'preserve'});
    }

}
