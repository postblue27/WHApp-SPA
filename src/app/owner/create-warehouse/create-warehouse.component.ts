import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Country } from 'src/app/models/country';
import { Warehouse } from 'src/app/models/warehouse';
import { AuthService } from 'src/app/_services/auth.service';
import { WarehouseService } from 'src/app/_services/warehouse.service';

@Component({
  selector: 'owner-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss']
})
export class CreateWarehouseComponent implements OnInit, AfterViewInit {
  googleMapOptions: google.maps.MapOptions = {};
  @ViewChild('searchInput') searchInput: ElementRef; 
  createWarehouseFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    capacity: ['', Validators.required],
    cost: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
  })
  searchAutoComplete = <google.maps.places.Autocomplete>{};
  countries: Country[] = [];
  selectedCountry: Country = new Country();
  selectedCity: string = '';
  markerPosition: any = null;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  constructor(private formBuilder: FormBuilder, private http: HttpClient, 
              private toastr: ToastrService, private authService: AuthService,
              private warehouseService: WarehouseService, private router: Router) { }

  ngOnInit() {
    this.http.get('/assets/countries-and-cities.json').subscribe(res => {
      for(let country in res) {
        this.countries.push({name: country, cities: res[country]});
      }
    })
  }

  ngAfterViewInit(): void {
    this.searchAutoComplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
    this.searchAutoComplete.addListener('place_changed', () => {
      let selectedPlace = this.searchAutoComplete.getPlace();
      this.markerPosition = selectedPlace.geometry.location;
      this.googleMapOptions = {
        center: selectedPlace.geometry.location,
        zoom: 15
      }
    })
  }

  countrySelectionChange(e: MatSelectChange) {
    this.selectedCountry = e.value as Country;
  }

  citySelectionChange(e: MatSelectChange): void {
    this.selectedCity = e.value as string;
    const searchString = `${this.selectedCountry.name} ${this.selectedCity}`;
    this.http.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchString}
    &inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyAy8ldycImiNfOa4Cdi2T3aM4_aKNf7PL8`)
    .subscribe((res: {candidates: {geometry: {location: {lat: number, lng: number}}}}) => {
      this.googleMapOptions = {
        center: res.candidates[0].geometry.location,
        zoom: 10
      }
      this.markerPosition = null;
    })
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPosition = event.latLng;
    this.googleMapOptions = {
      center: event.latLng,
      zoom: 15
    }
  }

  onFormSubmit() {
    console.log('from on submit', this.createWarehouseFormGroup.value)
    if(!this.markerPosition) {
      this.toastr.error('You need to choose place on the map.');
      return;
    }
    if(!this.createWarehouseFormGroup.valid) {
      this.toastr.error('Form is not valid. Check the values.');
      return;
    }
    
    this.createWarehouseFormGroup.addControl('Latitude', new FormControl(this.markerPosition.lat()))
    this.createWarehouseFormGroup.addControl('Longitude', new FormControl(this.markerPosition.lng()))
    this.createWarehouseFormGroup.value.ownerId = this.authService.getDecodedToken().nameid;
    this.createWarehouseFormGroup.value.country = this.createWarehouseFormGroup.value.country.name;
    console.log(this.createWarehouseFormGroup.value)
    this.warehouseService.addWarehouse(this.createWarehouseFormGroup.value as Warehouse).subscribe(res => {
      this.toastr.success('Warehouse created');
      this.router.navigateByUrl('/owner/list');
    }, error => {
      this.toastr.error('Server error', error.error);
    });
  }
}
