import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CrudOwnersComponent } from './crud-components/crud-owners/crud-owners.component';
import { CrudRentersComponent } from './crud-components/crud-renters/crud-renters.component';
import { CrudDriversComponent } from './crud-components/crud-drivers/crud-drivers.component';
import { CrudAdminsComponent } from './crud-components/crud-admins/crud-admins.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    CrudOwnersComponent,
    CrudRentersComponent,
    CrudDriversComponent,
    CrudAdminsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatExpansionModule,
    Ng2SmartTableModule,
  ]
})
export class AdminModule { }
