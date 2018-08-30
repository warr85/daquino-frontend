import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';
import {map} from 'rxjs/operators';
import { GLOBAL } from './../services/global';
import { Observable } from 'rxjs';



@Injectable()
export class AuthService {

 
  public url: string;
  public identity;
  public loggedIn = false;
  public token;
  
  constructor(private _http: Http){
		this.url = GLOBAL.url;
  }
  
  isAuthenticated(){
    this.identity = this.getIdentity();
    console.log(this.identity);
    if ((this.identity !== "undefined") || (this.identity !== null) ){ this.loggedIn = true; } 
    if (this.identity === null) this.loggedIn = false;
    const promise = new Promise(
      (resolve, reject) => {        
        resolve(this.loggedIn);       
      }
    );    
    return promise;
  }

  loginCheck(userToLogin){
		let json = JSON.stringify(userToLogin);
		let params = "json=" + json;

		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

		//console.log(params + "=>" + this.url + "=>" headers); 

		return this._http.post(this.url + "/login", params, {headers : headers})
			.pipe(map(res => res.json()));
  }


  getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if (identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken() {
		let token = JSON.parse(localStorage.getItem('token'));

		if (token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}
  

}
