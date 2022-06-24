import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Warehouse } from 'src/app/models/warehouse';
import { WarehouseService } from 'src/app/_services/warehouse.service';
import { WarehouseSearchDialogComponent } from '../warehouse-search-dialog/warehouse-search-dialog.component';


@Component({
  selector: 'app-renter-sidebar',
  templateUrl: './renter-sidebar.component.html',
  styleUrls: ['./renter-sidebar.component.scss']
})
export class RenterSidebarComponent implements OnInit, OnDestroy {
  display = true;
  ref!: DynamicDialogRef;
  subscriptions: Subscription[] = [];
  constructor(private warhouseService: WarehouseService, public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  showWarehousesDialog(): void {
    this.ref = this.dialogService.open(WarehouseSearchDialogComponent, {
      header: 'FIND WAREHOUSE',
      width: '90%',
    });

    this.subscriptions.push(this.ref.onClose.subscribe((warehouse: Warehouse) =>{
      if (warehouse) {
          this.warhouseService.warehouseChange.next(warehouse);
      }
    }));
  }

}
