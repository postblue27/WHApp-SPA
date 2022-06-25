import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RenterWarehouse } from '../models/renter-warehouse';
import { Warehouse } from '../models/warehouse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  baseUrl = environment.apiUrl + 'warehouse';
  warehouseChange: Subject<any> = new Subject();
  constructor(private http: HttpClient, private authService: AuthService) { }

  addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(`${this.baseUrl}/add-warehouse`, warehouse);
  }
  getOwnerWarehouses(ownerId: number): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.baseUrl + '/get-owner-warehouses/' + ownerId);
  }
  getAllWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.baseUrl + '/get-all-warehouses');
  }
  rentWarehouse(warehouse): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/rent-warehouse', 
      {
        renterId: this.authService.getDecodedToken().nameid,
        warehouseId: warehouse.id
      });
  }
  getRenterWarehouses(renterId: number): Observable<RenterWarehouse[]> {
    return this.http.get<RenterWarehouse[]>(this.baseUrl + '/get-renter-warehouses/' + renterId);
  }
  // updateUser(data: any) {
  //   return this.http.post(this.baseUrl + '/update-user', data);
  // }
  // deleteUser(userId: any) {
  //   return this.http.delete(this.baseUrl + '/delete-user/' + userId);
  // }
}
