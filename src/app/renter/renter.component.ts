import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.scss'],
  providers: [DialogService]
})
export class RenterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
