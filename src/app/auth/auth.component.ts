import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    ]
  });

  registerForm = this.fb.group({
    userType: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    ],
    confirmPassword: [null, Validators.required],
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

  login(form: FormGroup) {
    this.authService.login(form.value).subscribe(response => {
      this.toastr.success('Logged In');
    }, error => {
      console.log(error)
      this.toastr.error('Failed to login: ' + error);
    }, () => {
      if(this.authService.getDecodedToken().role === 'Admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(response => {
      this.toastr.success('User registered.');
      this.login(this.registerForm);
    }, error => {
      this.toastr.error('Error registering user.');
      console.log(error);
    });
  }

}
