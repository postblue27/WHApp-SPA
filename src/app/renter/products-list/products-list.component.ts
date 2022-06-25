import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { Warehouse } from 'src/app/models/warehouse';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  products: Product[];
  markerPosition: any = null;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  googleMapOptions: google.maps.MapOptions = {};
  constructor(private productsService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.getRenterProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getRenterProducts() {
    this.subscriptions.push(
      this.productsService.getRenterProducts(this.authService.getDecodedToken().nameid)
        .subscribe((products: Product[]) => {
          this.products = products;
        })
    );
  }

  revealOnTheMap(lat, lng) {
    this.googleMapOptions = {
      center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
      zoom: 15
    }
    this.markerPosition = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
  }

}
