import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { RenterComponent } from './renter.component';

const routes: Routes = [
  {path: 'renter', component: RenterComponent,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        // {path: 'create', component: CreateWarehouseComponent},
        // {path: 'list', component: WarehouseListComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RenterRoutingModule { }
