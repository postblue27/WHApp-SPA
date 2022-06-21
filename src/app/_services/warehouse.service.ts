import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Warehouse } from '../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  baseUrl = environment.apiUrl + 'warehouse';
  constructor(private http: HttpClient) { }

  addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(`${this.baseUrl}/add-warehouse`, warehouse);
  }
  getOwnerWarehouses(ownerId: number): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.baseUrl + '/get-owner-warehouses/' + ownerId);
  }
  // updateUser(data: any) {
  //   return this.http.post(this.baseUrl + '/update-user', data);
  // }
  // deleteUser(userId: any) {
  //   return this.http.delete(this.baseUrl + '/delete-user/' + userId);
  // }
}
