import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenterComponent } from './renter.component';
import { RenterRoutingModule } from './renter-routing.module';
import { RenterNavComponent } from './renter-nav/renter-nav.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../_shared/shared.module';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
// import {DividerModule} from 'primeng/divider';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';

import { WarehouseSearchDialogComponent } from './warehouse-search-dialog/warehouse-search-dialog.component';
import { RenterSidebarComponent } from './renter-sidebar/renter-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const materialModules = [
  MatIconModule,
  MatToolbarModule,
  MatRippleModule,
  MatButtonModule,
  MatTabsModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatSelectModule,
  MatOptionModule,
];

const primeNgModules = [
  SidebarModule,
  ButtonModule,
  DataViewModule,
  DynamicDialogModule,
  DropdownModule,
  InputTextModule,
  TableModule,
  CardModule
]

const googleMapsModules = [
  GoogleMapsModule,
]

@NgModule({
  imports: [
    CommonModule,
    RenterRoutingModule,
    ...materialModules,
    ...googleMapsModules,
    ...primeNgModules,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RenterComponent,
    RenterNavComponent,
    WarehouseSearchDialogComponent,
    RenterSidebarComponent
  ]
})
export class RenterModule { }
