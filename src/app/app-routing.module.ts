import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TempAuthComponent } from './temp-auth/temp-auth.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
