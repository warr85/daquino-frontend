import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
// import { AuthGuard } from './auth/auth.guard';
// import { AuthService } from './auth/auth.service';
import { LoginComponent } from './components/login/login.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppsettingsComponent } from './components/appsettings/appsettings.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ContractComponent } from './components/contract/contract.component';
import { RequisitionsComponent } from './components/requisitions/requisitions.component';
import { UsersComponent } from './components/users/users.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserService } from './services/user.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { CanDeactivateGuard } from './components/users/user-edit/can-deactivate-guard.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UserComponent } from './components/users/user/user.component';
import { UserResolver } from './components/users/user/user.resolver';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    AppsettingsComponent,
    HomeComponent,
    ContractComponent,
    RequisitionsComponent,
    UsersComponent,
    UserListComponent,
    UserEditComponent,
    ErrorPageComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService, AuthService, AuthGuard, CanDeactivateGuard, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
