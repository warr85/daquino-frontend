import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { RequisitionsComponent } from './components/requisitions/requisitions.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth/auth.guard';
import { CanDeactivateGuard } from './components/users/user-edit/can-deactivate-guard.service';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UserComponent } from './components/users/user/user.component';
import { UserResolver } from './components/users/user/user.resolver';

const routes: Routes = [
  { path: '', canActivate:[AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'security/users', canActivate: [AuthGuard], canActivateChild:[AuthGuard], component: UsersComponent, children: [
      { path: 'new', component: UserEditComponent },
      { path: ':id', component: UserComponent, resolve: {user: UserResolver} },
      { path: ':id/edit', component: UserEditComponent, canDeactivate: [CanDeactivateGuard] }
    ] },
  { path: 'contracts', component: ContractsComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'requisitions', component: RequisitionsComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error-page'}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],  
})

export class AppRoutingModule {
}
