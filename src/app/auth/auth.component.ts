import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../_helpers/custom-validators';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  model: any;
  loginForm = this.fb.group({
    userType: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required])
    ],
    // address: [null, Validators.required],
    // address2: null,
    // city: [null, Validators.required],
    // userType: [null, Validators.required],
    // postalCode: [null, Validators.compose([
    //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ],
    // shipping: ['free', Validators.required]
  });

  registerForm = this.fb.group({
    userType: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    ],
    confirmPassword: [null, Validators.required/*CustomValidators.passwordMatchValidator*/],
  },
  {
    validator: CustomValidators.passwordMatchValidator
  });

  userTypes = [
    {name: 'Owner'},
    {name: 'Renter'},
    {name: 'Driver'},
    {name: 'Admin'},
  ];

  constructor(private fb: FormBuilder, private authService: AuthService,
    public toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(response => {
      this.toastr.success('Logged In');
    }, error => {
      this.toastr.error('Failed to login: ' + error);
    }, () => {
      if(this.authService.getDecodedToken().role === 'Admin')
      this.router.navigate(['/admin']);
    });
  }

  register() {
    console.log(this.registerForm.value);
    
    this.authService.register(this.registerForm.value).subscribe(response => {
      console.log(response);
      // this.router.navigateByUrl('/dashboard');
    }, error => {
      console.log(error);
    });
  }

}
