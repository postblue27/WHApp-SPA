import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserTypes } from 'src/app/_helpers/UserTypes';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-crud-owners',
  templateUrl: './crud-owners.component.html',
  styleUrls: ['./crud-owners.component.css']
})
export class CrudOwnersComponent implements OnInit {

  settings = {
    columns: {
      id: {
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
  owners: any;
  constructor(private adminService: AdminService, private authService: AuthService,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers(UserTypes.Owner).subscribe(response => {
      this.owners = response;
      console.log(response);
    }, error => {
      this.toastr.error(error);
      console.error(error);
    })
  }

  updateUser(e: any) {
    this.adminService.updateUser(e.newData).subscribe(response => {
      this.getUsers();
      this.toastr.success('User updated');
    }, error => {
      this.toastr.error(error);
      console.error(error);
    });
  }

  deleteUser(e: any) {
    this.adminService.deleteUser(e.data.id).subscribe(response => {
      this.getUsers();
      this.toastr.success('User deleted');
    }, error => {
      this.toastr.error('Error deleting user');
      console.error(error);
    });
  }

  createUser(e: any) {
    const userToCreate = {
      'username': e.newData.username,
      'userType': UserTypes.Owner,
      'email': e.newData.email,
      'password': e.newData.password
    };
    this.authService.register(userToCreate).subscribe(response => {
      this.getUsers();
      this.toastr.success('User created');
    }, error => {
      this.toastr.error('Error creating user');
      console.error(error);
    });
  }
}
