import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { OwnerRoutingModule } from './owner-routing.module';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { CreateWarehouseComponent } from './create-warehouse/create-warehouse.component';
import { OwnerNavComponent } from './owner-nav/owner-nav.component';
import { SharedModule } from '../_shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';


const materialModules = [
  MatIconModule,
  MatToolbarModule,
  MatRippleModule,
  MatButtonModule,
  MatTabsModule
];

@NgModule({
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ...materialModules,

    SharedModule
  ],
  declarations: [
    OwnerComponent,
    WarehouseListComponent,
    CreateWarehouseComponent,
    OwnerNavComponent,
  ]
})
export class OwnerModule { }
