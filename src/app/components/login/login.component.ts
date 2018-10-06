import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../auth/auth.service';

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
		input.ng-invalid.ng-touched{
			border: 1px solid red;
		}
  `]   
})

export class LoginComponent implements OnInit {

	loginForm: FormGroup;

    public credentials;
    public identity;
	public token;
	public e: boolean;
	public errorMsg;
	forgot: boolean;
	buttonLoading: boolean;
	msgEmail: boolean;
	useremail = "";

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
		private _userService: UserService,
		private _authService: AuthService
  ) {
		  this.forgot = false;
		  this.msgEmail = false;
		  this.buttonLoading = false;
        this.credentials = {
            'username' : '',
            'password' : '',
            'hashed' : true
		};
		
		this.e = false;
    }

    ngOnInit() {
        console.log('componente cargado');
        console.log(this._authService.getIdentity());
        console.log(this._authService.getToken());
        this.logOut();
		this.ifLogged();
		
		this.loginForm = new FormGroup({
			'username' : new FormControl(null),
			'password' : new FormControl(null)
		});

    }

    ifLogged() {
        let identity = this._authService.getIdentity();
        if(identity != null && identity.sub){
			this._router.navigate(["/daquino-prod/"]);
		}
	}

	logOut(){

		if(+this._route.snapshot.params['id'] === 1){
			localStorage.removeItem('identity');
			localStorage.removeItem('token');
			this.identity = null;
			this.token = null;
			//redirect development
			window.location.href = "/login";
			//redirect production
			//window.location.href = "/daquino-prod/login";
		}

		/*this._route.params.forEach((params: Params) => {
			let logout = +params['id'];
			if(logout == 1){
				localStorage.removeItem('identity');
				localStorage.removeItem('token');

				this.identity = null;
				this.token = null;

				window.location.href = "/login";
			}
		});*/
	}


	onResetPassword() {
		this.buttonLoading = true;
		this.credentials = this.loginForm.value;
		this.credentials.hashed = true;
		
		console.log(this.credentials.username);
		this._authService.loginReset(this.credentials.username).subscribe(
			response => { 				 
				this.buttonLoading = false;
				if(response.status == "success"){
					this.msgEmail = true;  
					console.log(response);
					this.useremail = response.email;
				}else{
					this.errorMsg="Username does not exist!"
					this.e = true;
				}
			}
		);
	}


	onSubmit() {
		this.buttonLoading = true;
		this.credentials = this.loginForm.value;
		this.credentials.hashed = true;
		
    	//alert(this._userService.signup());
		this.credentials.hashed = true;		
    	this._authService.loginCheck(this.credentials).subscribe(
    		response => {    
				console.log(response);
				this.buttonLoading = false;
				if(response.status === 'error'){
					this.e = true;
					this.errorMsg = response.data;
				}else{
					this.e = false;
    				this.identity = response;
					if (this.identity.length <= 1){
						console.log("error en el servidor");
					}{

						if(!this.identity.status){    					
							localStorage.setItem('identity' , JSON.stringify(this.identity));
							console.log(this.identity);
							//Get Token
							this.credentials.hashed = false;
							this._authService.loginCheck(this.credentials).subscribe(
								response => {    			
									this.token = response;
									if (this.token.length <= 1){
										console.log("error en el servidor obteniendo token");
									}{
										if(!this.token.status){    					
											localStorage.setItem('token' , JSON.stringify(this.token));
											//redirect development
											window.location.href = "/";
											//redirect production
											//window.location.href = "/daquino-prod/";
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
				}
    		},
    		error => {
				console.log(<any>error);
				this.e = true;
				this.errorMsg = "Error: Please check your inputs";
    		}
    	);
  }
}