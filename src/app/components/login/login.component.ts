import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  //encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styles: [`
	    .content-wrapper, .main-footer {
	    		margin-left: 0!important;
		}
		.content {
		    padding-bottom: 141px;
		}
  `],
   providers: [ UserService ],
})

export class LoginComponent implements OnInit {
    public user;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
  ) {
        this.user = {
            'username' : '',
            'password' : '',
            'hashed' : true
        };
    }

    ngOnInit() {
        console.log('componente cargado');
        console.log(this._userService.getIdentity());
        console.log(this._userService.getToken());
        this.logOut();
        this.ifLogged();
    }

    ifLogged() {
        const identity = this._userService.getIdentity();
        if(identity != null && identity.sub){
			this._router.navigate(["/"]);
		}
	}

	logOut(){
		this._route.params.forEach((params: Params) => {
			let logout = +params['id'];
			if(logout == 1){
				localStorage.removeItem('identity');
				localStorage.removeItem('token');

				this.identity = null;
				this.token = null;

				window.location.href = "/login";
			}
		});
	}

	onSubmit() {
    	//console.log(this.user);
    	//alert(this._userService.signup());
    	this.user.hashed = true;
    	this._userService.signup(this.user).subscribe(
    		response => {    			
    			this.identity = response;
    			if (this.identity.length <= 1){
    				console.log("error en el servidor");
    			}{

    				if(!this.identity.status){    					
    					localStorage.setItem('identity' , JSON.stringify(this.identity));
    					console.log(this.identity);
    					//Get Token
    					this.user.hashed = false;
    					this._userService.signup(this.user).subscribe(
				    		response => {    			
				    			this.token = response;
				    			if (this.token.length <= 1){
				    				console.log("error en el servidor obteniendo token");
				    			}{
				    				if(!this.token.status){    					
				    					localStorage.setItem('token' , JSON.stringify(this.token));
				    					window.location.href = "/";
				    					console.log(this.token);
				    				}
				    			}
				    		},
				    		error => {
				    			console.log(<any>error)
				    		}
				    	);


    				}
    			}
    		},
    		error => {
    			console.log(<any>error)
    		}
    	);
  }
}