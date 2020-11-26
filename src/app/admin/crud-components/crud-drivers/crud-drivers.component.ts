import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserTypes } from 'src/app/_helpers/UserTypes';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-crud-drivers',
  templateUrl: './crud-drivers.component.html',
  styleUrls: ['./crud-drivers.component.css']
})
export class CrudDriversComponent implements OnInit {

  settings = {
    columns: {
      userId: {
        title: 'UserId',
        editable: false
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      },
      password: {
        title: 'Password',
        editable: false
      }
    },
    mode: 'inline', 
    edit: { confirmSave: true },
    delete: {confirmDelete: true},
    add: {confirmCreate: true}
    // add: {addButtonContent: ""}
  };

  drivers: any;
  constructor(private adminService: AdminService, private authService: AuthService,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers(UserTypes.Driver).subscribe(response => {
      this.drivers = response;
      console.log(response);
    }, error => {
      this.toastr.error(error);
    })
  }

  updateUser(e: any) {
    // console.log(e);
    this.adminService.updateUser(UserTypes.Driver, e.newData).subscribe(response => {
      // console.log(response);
      this.getUsers();
      this.toastr.success('User updated');
    }, error => {
      this.toastr.error(error);
    });
  }

  deleteUser(e: any) {
    // console.log(e);
    this.adminService.deleteUser(UserTypes.Driver, e.data.userId).subscribe(response => {
      this.getUsers();
      this.toastr.success('User deleted');
    }, error => {
      this.toastr.error(error);
    });
  }

  createUser(e: any) {
    // console.log(e);
    const userToCreate = {
      'username': e.newData.username,
      'userType': UserTypes.Driver,
      'email': e.newData.email,
      'password': e.newData.password
    };
    this.authService.register(userToCreate).subscribe(response => {
      this.getUsers();
      this.toastr.success('User created');
    }, error => {
      this.toastr.error('Error creating user');
    });
  }
}
