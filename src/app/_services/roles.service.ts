import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  baseUrl = environment.apiUrl;
  
constructor( private http: HttpClient, public toastr: ToastrService ) { }

  getRoles() {
    return this.http.get(this.baseUrl + 'app/get-roles');
  }

}
