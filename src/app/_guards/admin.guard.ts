import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}
  canActivate(): boolean {
    // console.log('Role is:' + this.authService.decodedToken.role);
    // return this.authService.decodedToken.role.pipe(
    //   map(role => {
    //     if(role === 'Admin') return true;
    //   })
    // );
    if(this.authService.getDecodedToken().role === 'Admin') {
      return true;
    }
    return false;
  }
  
}
