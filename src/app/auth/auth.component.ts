import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../_helpers/custom-validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm = this.fb.group({
    role: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required])
    ],
    // address: [null, Validators.required],
    // address2: null,
    // city: [null, Validators.required],
    // role: [null, Validators.required],
    // postalCode: [null, Validators.compose([
    //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ],
    // shipping: ['free', Validators.required]
  });

  registerForm = this.fb.group({
    role: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    ],
    confirmPassword: [null, Validators.required/*CustomValidators.passwordMatchValidator*/],
  },
  {
    validator: CustomValidators.passwordMatchValidator
  });

  roles = [
    {name: 'Owner'},
    {name: 'Renter'},
    {name: 'Driver'}
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  login() {

  }

  register() {

  }

}
