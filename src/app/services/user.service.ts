import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { GLOBAL } from './global';
import { User } from './../components/users/users.model';
import { Subject } from 'rxjs';

@Injectable()
export class UserService{
	public url: string;
	public identity;
	public token;
	public userCreated = new Subject();

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	
	


	register(user) {
		
		let json = JSON.stringify(user);		
		let params = "json=" + json;
		console.log(params);

		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
		return this._http.post(this.url + "/security/user/new", params, {headers : headers})
			.pipe(map(res => res.json()));

	}


	getUsers(token, page = null) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
		if (page == null) page = 1;
		return this._http.post(this.url + "/security/user/list", params, {headers : headers})
			.pipe(map(res => res.json()));
	}

	getSingleUser(token, id = null) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
		if (id == null) id = 1;
		return this._http.post(this.url + "/security/user/show/" + id, params, {headers : headers})
			.pipe(map(res => res.json()));
	}

	onUserCreated(){
		/*this.users.push({username:"userData.email", password:"asdfasdfasdf",  group: 1, membership:1});
    	console.log(this.users);*/
	}

}