import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/models/warehouse';
import { AuthService } from 'src/app/_services/auth.service';
import { WarehouseService } from 'src/app/_services/warehouse.service';

@Component({
  selector: 'owner-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})
export class WarehouseListComponent implements OnInit {
  panelOpenState: boolean = false;
  warehouses: Warehouse[] = [];
  markerPosition: any = null;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  googleMapOptions: google.maps.MapOptions = {};
  activeWarehouseMapToggle: Warehouse;
  constructor(private authService: AuthService, private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.getOwnerWarehouses(this.authService.getDecodedToken().nameid);
  }

  getOwnerWarehouses(ownerId: number): void {
    this.warehouseService.getOwnerWarehouses(ownerId).subscribe(response => {
      this.warehouses = response;
      console.log(this.warehouses)
    });
  }

  revealOnTheMap(lat, lng) {
    this.googleMapOptions = {
      center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
      zoom: 15
    }
    this.markerPosition = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
  }
}
