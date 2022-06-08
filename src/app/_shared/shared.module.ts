import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDropdownMenuComponent } from './user-dropdown-menu/user-dropdown-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  declarations: [
    UserDropdownMenuComponent,
  ],
  exports: [
    UserDropdownMenuComponent,
  ]
})
export class SharedModule { }
