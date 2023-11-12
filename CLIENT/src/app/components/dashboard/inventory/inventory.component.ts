import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bike } from 'src/app/models/bike';
import { Page, Pagination } from 'src/app/models/pagination';
import { BikeService } from 'src/app/services/bike.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  bikes: Bike[] = [];
  page: Page = new Page(1, 8);
  pagination: Pagination | undefined;

  constructor(private bikeService: BikeService,
    private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.getBikeList();
  }

  getBikeList() {
    this.bikeService.getBikes(this.page).subscribe({
      next: response => {
        if (response.results && response.pagination) {
          this.bikes = response.results;
          console.log(this.bikes);
          
          this.pagination = response.pagination;
        }
      },
      error: error => this.toaster.error(error.error)
    });
  }

  pageChanged(event: any) {
    if (this.page.pageNumber != event.page) {
      this.page.pageNumber = event.page;
      this.getBikeList()
    }
  }

  createBike(){
    
  }
}
