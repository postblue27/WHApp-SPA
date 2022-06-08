import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.scss']
})
export class UserDropdownMenuComponent implements OnInit {
  decodedToken: any;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.decodedToken = this.authService.getDecodedToken();
  }

}
