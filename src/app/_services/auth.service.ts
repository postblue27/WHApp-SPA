import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Snotify, SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  loginMode: boolean = false;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, public snotify: SnotifyService) { }

  login(model: any){
    // this.snotify.success('temp success');
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            console.log(user);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
          }
        })
      );
  }

  isAdmin() {
    return this.decodedToken.unique_name === 'admin';
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.decodedToken = '';
    console.log('logged out');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }


}
