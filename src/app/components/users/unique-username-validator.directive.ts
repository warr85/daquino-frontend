import { Directive } from '@angular/core';
import { AsyncValidator, ValidationErrors, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[uniqueUsernameValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUsernameValidatorDirective, multi: true }]
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {
  public token;
  constructor(
    private _userService: UserService,
    private _authService: AuthService
  ) {
    this.token = this._authService.getToken();
  }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this._userService.checkUsernameTaken(this.token, c.value).pipe(
      map(response => {
        console.log(response);
        let u = response.status === 'success' ? { 'uniqueUserName': true } : null;
        console.log(u);
        return u;
      })
    )
  }

}
