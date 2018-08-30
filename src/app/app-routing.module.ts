import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContractComponent } from './components/contract/contract.component';
import { RequisitionsComponent } from './components/requisitions/requisitions.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth/auth.guard';
import { CanDeactivateGuard } from './components/users/user-edit/can-deactivate-guard.service';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', canActivate:[AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'security/user', 
    canActivateChild:[AuthGuard], component: UsersComponent, children: [
      { path: '', component: UserEditComponent, canDeactivate: [CanDeactivateGuard] } 
    ] },
  { path: 'contract', component: ContractComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'requisitions', component: RequisitionsComponent },
  { path: '**', redirectTo: ''}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],  
})

export class AppRoutingModule {
}
