import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers } from '@angular/http';
import {map, catchError} from 'rxjs/operators';
import { GLOBAL } from './global';
import { User } from './../components/users/users.model';
import { Subject, of } from 'rxjs';

@Injectable()
export class UserService{
	public url: string;
	public identity;
	public token;
	public userCreated = new Subject();
	public userEdited = new Subject();

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	
	


	register(token, user) {
		
		let json = JSON.stringify(user);		
		let params = "json=" + json + "&authorization=" + token;		
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
		
		return this._http.post(
			this.url + "/security/user/new", 
			params, 
			{headers : headers}
		).pipe(
			map(res => res.json())			
		);

	}

	updateUser(token, user){
		console.log("ESTO ES USU:")
		console.log(user);
		let json = JSON.stringify(user);
		console.log(json);
		let params = "json=" + json + "&authorization=" + token;
		console.log(params);
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });

		return this._http.post(
			this.url + "/security/user/update/permission",
			params,
			{headers: headers}
		).pipe(
			map(res => res.json())
		);
	}


	getUsers(token, page = null) {		
		if (page == null) page = 1;
		console.log("this is page: " + page);
		let params = "authorization=" + token + "&page=" + page;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
		
		return this._http.post(
			this.url + "/security/user/list", 
			params, 
			{headers : headers}
		).pipe(
			map(res => res.json()),
			catchError(err => of(`I caught: ${err}`))
		);
	}

	getSingleUser(token, id = null) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
		if (id == null) id = 1;
		console.log(id);
		return this._http.post(
			this.url + "/security/user/show/" + id, 
			params, 
			{headers : headers}
		).pipe(			
			map(res => res.json())
		);
	}


	getRoles(token) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });		
		return this._http.post(
			this.url + "/security/user/all/roles",
			params, 
			{headers : headers}
		).pipe(			
			map(res => res.json())
		);
	}

	checkUsernameTaken(token, username = null) {
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });		
		return this._http.post(this.url + "/security/user/checkusername/" + username, params, {headers : headers})
			.pipe(map(res => res.json()));
	}

	getPermission(token, username, role){		
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });		
		return this._http.post(
			this.url + "/security/user/permission/" + username + "/" + role, 
			params, 
			{headers : headers}
		).pipe(			
			map(res => res.json())
		);
	}

	disableUser(token, userid){
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });		
		return this._http.post(
			this.url + "/security/user/disable/" + userid, 
			params, 
			{headers : headers}
		).pipe(			
			map(res => res.json())
		);
	}

	enableUser(token, userid){
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });		
		return this._http.post(
			this.url + "/security/user/enable/" + userid, 
			params, 
			{headers : headers}
		).pipe(			
			map(res => res.json())
		);
	}

	resetUser(token, userdescription){
		let params = "authorization=" + token;
		let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });		
		return this._http.post(
			this.url + "/security/user/reset/" + userdescription, 
			params, 
			{headers : headers}
		).pipe(			
			map(res => res.json())
		);
	}

	onUserCreated(){
		/*this.users.push({username:"userData.email", password:"asdfasdfasdf",  group: 1, membership:1});
    	console.log(this.users);*/
	}

}