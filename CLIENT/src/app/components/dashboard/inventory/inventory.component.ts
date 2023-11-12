import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bike } from 'src/app/models/bike';
import { Page, Pagination } from 'src/app/models/pagination';
import { BikeService } from 'src/app/services/bike.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateBikeComponent } from '../../../modals/create-bike/create-bike.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  bikes: Bike[] = [];
  page: Page = new Page(2, 8);
  pagination: Pagination | undefined;

  constructor(
    private bikeService: BikeService,
    private toaster: ToastrService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBikeList();
  }

  getBikeList() {
    this.bikeService.getBikes(this.page).subscribe({
      next: response => {
        if (response.results && response.pagination) {
          this.bikes = response.results;
          this.pagination = response.pagination;
          console.log(response.results);
        }
      },
      error: error => this.toaster.error(error.error)
    });
  }

  bikeDeletion(event: boolean) {
    this.getBikeList();
  }

  pageChanged(event: any) {
    if (this.page.pageNumber != event.page) {
      this.page.pageNumber = event.page;
      this.getBikeList();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateBikeComponent, {
      width: '300px',
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getBikeList();
    });
  }
}
