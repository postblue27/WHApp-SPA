import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { OwnerComponent } from './owner.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';

const routes: Routes = [
  {path: 'owner', component: OwnerComponent,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        {path: 'create', component: CreateWarehouseComponent},
        {path: 'list', component: WarehouseListComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
