import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RenterWarehouse } from 'src/app/models/renter-warehouse';
import { Warehouse } from 'src/app/models/warehouse';
import { AuthService } from 'src/app/_services/auth.service';
import { WarehouseService } from 'src/app/_services/warehouse.service';

@Component({
  selector: 'app-rented-warehouses',
  templateUrl: './rented-warehouses.component.html',
  styleUrls: ['./rented-warehouses.component.scss']
})
export class RentedWarehousesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  rentedWarehouses: Warehouse[];
  markerPosition: any = null;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  googleMapOptions: google.maps.MapOptions = {};
  activeWarehouseMapToggle: Warehouse;
  constructor(private warehouseService: WarehouseService, private authService: AuthService) { }

  ngOnInit() {
    this.getRenterWarehouses();
    this.subscribeToRentedWarehouseChange();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getRenterWarehouses() {
    this.subscriptions.push(
      this.warehouseService.getRenterWarehouses(this.authService.getDecodedToken().nameid).pipe(
        map( renterWarehouses => {
          let warehouses: Warehouse[] = [];
          renterWarehouses.forEach(rw => {
            warehouses.push(rw.warehouse);
          })
          return warehouses;
        })
      )
      .subscribe((warehouses: Warehouse[]) => {
        this.rentedWarehouses = warehouses;
      })
    );
  }
  subscribeToRentedWarehouseChange(): void {
    this.subscriptions.push(
      this.warehouseService.warehouseChange.pipe(
        switchMap(() => {
          return this.warehouseService.getRenterWarehouses(this.authService.getDecodedToken().nameid)
        }),
        map( renterWarehouses => {
          let warehouses: Warehouse[] = [];
          renterWarehouses.forEach(rw => {
            warehouses.push(rw.warehouse);
          })
          return warehouses;
        })
      )
      .subscribe((warehouses: Warehouse[]) => {
        this.rentedWarehouses = warehouses;
      })
    )
  }

  revealOnTheMap(lat, lng) {
    this.googleMapOptions = {
      center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
      zoom: 15
    }
    this.markerPosition = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
  }
}
