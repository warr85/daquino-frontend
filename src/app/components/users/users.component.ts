import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './users.model';
import { UserService } from './../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { merge } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
 
  private subscription: Subscription;
  loading: boolean;
  public token;
  public page;
  public pages;
  public pageNext;
  public pagePrev;
  public created: boolean = false;  
  public users: User[];
  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _authService: AuthService
) {
     this.token = this._authService.getToken();
     this.page = 1;
     this.pages = [];
  }

  ngOnInit() {
    
    this.loading = true;  
    this.getAllUsers();   

    this._userService.userCreated.subscribe(
      (user: User) => {
        //console.log(user);
        this.users.push(user);
        this.created = true;
      }
    );


    this._userService.userEdited.subscribe(
      (user: User) => {
        console.log(this.users);
        let userEdited: User;
        const ufilter = this.users.filter((u: User) => {
          if(u.description === user.description){
            u.iduds006.description = user.iduds006.description            
          }
        }); 
        //this.users       
      }
    );
  }

  getAllUsers(){
    console.log(this._route.params);
    this._route.queryParams.subscribe(params => {
      this.page = +params['page'];
      //console.log("params: " + params);
      //console.log(params);
      console.log(this.page);
      if (!this.page) this.page = 1;

      this.subscription = this._userService.getUsers(this.token, this.page).subscribe(
        response => {
          console.log(response);
          if (response.status === "success"){
            this.users = response.users;
            this.loading = false;
          }
          //total de paginas
          this.pages=[];
          for(let i=0; i< response.total_pages; i++){
            this.pages.push(i);
          }
          console.log(this.pages);
          //pagina anterior
          if(this.page >= 2){
            this.pagePrev = this.page - 1;
          }else{
            this.pagePrev = this.page;
          }
          
          //pagina sigueinte
          if(this.page < response.total_pages){
            this.pageNext = this.page + 1;
          }else{
            this.pageNext = this.page;
          }

          
          console.log(this.users);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  addNew() {
    this._router.navigate(['new'], {relativeTo: this._route, queryParamsHandling:'preserve'})
  }

  

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
