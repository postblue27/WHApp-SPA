import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl + 'product';
  warehouseChange: Subject<any> = new Subject();
  constructor(private http: HttpClient, private authService: AuthService) { }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/add-product`, product);
  }
  getRenterProducts(renterId: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/get-renter-products/' + renterId);
  }
}
