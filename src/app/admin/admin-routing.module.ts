import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../_guards/admin.guard';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CrudAdminsComponent } from './crud-components/crud-admins/crud-admins.component';
import { CrudDriversComponent } from './crud-components/crud-drivers/crud-drivers.component';
import { CrudOwnersComponent } from './crud-components/crud-owners/crud-owners.component';
import { CrudRentersComponent } from './crud-components/crud-renters/crud-renters.component';

const adminRoutes: Routes = [
    {path: 'admin', component: AdminDashboardComponent,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard, AdminGuard],
      children: [
        {path: 'admins', component: CrudAdminsComponent},
        {path: 'owners', component: CrudOwnersComponent},
        {path: 'renters', component: CrudRentersComponent},
        {path: 'drivers', component: CrudDriversComponent},
      ]
}
];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
