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
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';


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

const googleMapsModules = [
  GoogleMapsModule,
]

@NgModule({
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ...materialModules,
    ...googleMapsModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,

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
