import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContractComponent } from './components/contract/contract.component';
import { RequisitionsComponent } from './components/requisitions/requisitions.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate:[AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'security/user', canActivateChild:[AuthGuard], component: UsersComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'requisitions', component: RequisitionsComponent },
  { path: '**', redirectTo: ''}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})

export class AppRoutingModule {
}
