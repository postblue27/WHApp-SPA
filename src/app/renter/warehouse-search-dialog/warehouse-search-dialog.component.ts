import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/_services/warehouse.service';

@Component({
  selector: 'app-warehouse-search-dialog',
  templateUrl: './warehouse-search-dialog.component.html',
  styleUrls: ['./warehouse-search-dialog.component.scss']
})
export class WarehouseSearchDialogComponent implements OnInit, OnDestroy {
  warehouses: Warehouse[] = [];
  filteredWarehouses: Warehouse[] = [];
  subscriptions: Subscription[] = [];
  searchString: string = '';
  selectedCountry: Country | null = new Country();
  selectedCity: string | null = null;
  countries: Country[] = [];
  selectedCountryCities: SelectItem[] = [];
  constructor(private warehouseService: WarehouseService, public ref: DynamicDialogRef, private http: HttpClient,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getWarehouses();
    this.getCountries();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getCountries(): void {
    this.http.get('/assets/countries-and-cities.json').subscribe(res => {
      let countriesArray = [];
      for(let country in res) {
        countriesArray.push({name: country, cities: res[country]});
      }
      this.countries = countriesArray;
    })
  }

  getWarehouses(): void {
    this.subscriptions.push(this.warehouseService.getAllWarehouses().subscribe(warehouses => {
      this.warehouses = warehouses;
      this.filteredWarehouses = warehouses;
    }));
  }

  onCountryChange(event: any): void {
    this.selectedCountry = event.value as Country;
    this.selectedCountryCities = [];
    for( let city in this.selectedCountry.cities) {
      this.selectedCountryCities.push({label: this.selectedCountry.cities[city], value: this.selectedCountry.cities[city]})
    }
    this.applyFilters();
  }

  onCityChange(event: any): void {
    this.selectedCity = event.value as string;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredWarehouses = this.warehouses.filter(warehouse => {
      //applying country filter
      if(this.selectedCountry.name) {
        if(warehouse.country != this.selectedCountry.name) 
          return false;
      }
      //applying city filter
      if(this.selectedCity) {
        if(warehouse.city != this.selectedCity) 
          return false;
      }
      //applying search string
      if(this.searchString) {
        if( !this.searchStringLowerCaseEqualityCheck(
            this.searchString, 
            warehouse.name, 
            warehouse.country, 
            warehouse.city, 
            warehouse.cost.toString(),
            warehouse.capacity.toString())) {
          return false;
        }
      }
      return true;
    });
  }

  clearFilters(): void {
    this.searchString = '';
    this.selectedCountry = new Country();
    this.selectedCity = null;
    this.selectedCountryCities = [];
    this.applyFilters();
  }

  searchStringLowerCaseEqualityCheck(searchString: string, ...searchArray: string[]): boolean {
    for(let s in searchArray) {
      if(searchArray[s].toLowerCase().includes(searchString.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  rentWarehouse(warehouse: Warehouse) {
    this.warehouseService.rentWarehouse(warehouse).subscribe(() => {
      this.toastr.info(`Warehouse ${warehouse.name} rented.`);
      this.ref.close(warehouse);
    }, error => {
      this.toastr.error('Error renting warehouse.');
    });
  }
}
