import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers } from '@angular/http';
//import {Http, HTTP_PROVIDERS} from '@angular/http';
import {map} from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public url: string;
	public identity;
	public token;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	signup(userToLogin){
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

	getToken(){
		let token = JSON.parse(localStorage.getItem('token'));

		if (token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}


	register(user){
		let json = JSON.stringify(user);
		let params = "json=" + json;

		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/security/user/new", params, {headers : headers})
			.pipe(map(res => res.json()));

	}

}