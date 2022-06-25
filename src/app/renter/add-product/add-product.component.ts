import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Country } from 'src/app/models/country';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, AfterViewInit {
  googleMapOptions: google.maps.MapOptions = {};
  @ViewChild('searchInput') searchInput: ElementRef; 
  addProductFormGroup = this.formBuilder.group({
    productName: ['', Validators.required],
    capacity: ['', Validators.required],
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
              private productService: ProductService, private router: Router) { }

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
    console.log('from on submit', this.addProductFormGroup.value)
    if(!this.markerPosition) {
      this.toastr.error('You need to choose place on the map.');
      return;
    }
    if(!this.addProductFormGroup.valid) {
      this.toastr.error('Form is not valid. Check the values.');
      return;
    }
    
    this.addProductFormGroup.addControl('Latitude', new FormControl(this.markerPosition.lat()))
    this.addProductFormGroup.addControl('Longitude', new FormControl(this.markerPosition.lng()))
    this.addProductFormGroup.value.renterId = this.authService.getDecodedToken().nameid;
    this.addProductFormGroup.value.country = this.addProductFormGroup.value.country.name;
    console.log(this.addProductFormGroup.value)
    this.productService.addProduct(this.addProductFormGroup.value as Product).subscribe(res => {
      this.toastr.success('Product created');
      this.router.navigateByUrl('products-list');
    }, error => {
      this.toastr.error('Server error', error.error);
    });
  }

}
