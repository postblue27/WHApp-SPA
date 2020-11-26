import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AuthService } from './_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [	
    AppComponent,
    AuthComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatRadioModule,
    MatListModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
    SnotifyModule,
    HttpClientModule,
    AdminModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config : {
         tokenGetter: tokenGetter,
         allowedDomains: ['localhost:5000', 'https://hrp-api.herokuapp.com'],
         disallowedRoutes: ['localhost:5000/api/auth', 'https://hrp-api.herokuapp.com/api/auth']
      }
   }),
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
