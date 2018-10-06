import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';

import { LoginComponent } from './components/login/login.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppsettingsComponent } from './components/appsettings/appsettings.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { RequisitionsComponent } from './components/requisitions/requisitions.component';
import { UsersComponent } from './components/users/users.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserService } from './services/user.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { CanDeactivateGuard } from './components/users/user-edit/can-deactivate-guard.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UserComponent } from './components/users/user/user.component';
import { UserResolver } from './components/users/user/user.resolver';
import { ContractEditComponent } from './components/contracts/contract-edit/contract-edit.component';
import { FilterUserPipe } from './filter-user.pipe';
import { UniqueUsernameValidatorDirective } from './components/users/unique-username-validator.directive';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { UserShowComponent } from './components/password-reset/user-show/user-show.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    AppsettingsComponent,
    HomeComponent,
    ContractsComponent,
    RequisitionsComponent,
    UsersComponent,
    UserEditComponent,
    ErrorPageComponent,
    UserComponent,
    ContractEditComponent,
    FilterUserPipe,
    UniqueUsernameValidatorDirective,
    PasswordResetComponent,
    UserShowComponent
  ],
  imports: [
    A2Edatetimepicker,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    NgxPaginationModule
  ],
  providers: [UserService, AuthService, AuthGuard, CanDeactivateGuard, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
