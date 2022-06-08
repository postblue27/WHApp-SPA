import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Snotify, SnotifyService } from 'ng-snotify';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  loginMode: boolean = false;
  jwtHelper = new JwtHelperService();
  private decodedToken: any;

  constructor(private http: HttpClient, public toastr: ToastrService, private router: Router) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            console.log(user);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
            console.log('Role is:' + this.decodedToken.role);
          }
        })
      );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.decodedToken = '';
    this.router.navigateByUrl('/auth');
    console.log('logged out');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  getDecodedToken() {
    let token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    return this.decodedToken;
  }
}
