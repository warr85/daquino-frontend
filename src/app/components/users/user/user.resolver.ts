import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../users.model';
import { AuthService } from '../../../auth/auth.service';



@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
      private _userService: UserService,
      private _authService: AuthService
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    let token = this._authService.getToken();   
    return this._userService.getSingleUser(token, +route.params['id']);
  }
}