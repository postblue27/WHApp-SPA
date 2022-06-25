import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { RentedWarehousesComponent } from './rented-warehouses/rented-warehouses.component';
import { RenterComponent } from './renter.component';

const routes: Routes = [
  {path: 'renter', component: RenterComponent,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        {path: 'rented-warehouses', component: RentedWarehousesComponent},
        {path: 'add-product', component: AddProductComponent},
        {path: 'products-list', component: ProductsListComponent},
        // {path: 'list', component: WarehouseListComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RenterRoutingModule { }
