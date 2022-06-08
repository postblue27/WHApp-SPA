import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl + 'admin';
  constructor(private http: HttpClient) { }

  getUsers(userType: any) {
    return this.http.get(this.baseUrl + '/get-users/' + userType);
  }
  updateUser(data: any) {
    return this.http.post(this.baseUrl + '/update-user', data);
  }
  deleteUser(userId: any) {
    return this.http.delete(this.baseUrl + '/delete-user/' + userId);
  }
}
