import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Bike } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';

@Component({
  selector: 'bike-card',
  templateUrl: './bike-card.component.html',
  styleUrls: ['./bike-card.component.scss']
})
export class BikeCardComponent implements OnInit {
  @Input() bike: Bike | undefined;
  @Output() bikeDeletion = new EventEmitter();

  constructor(
    private bikeService: BikeService,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  deleteBike(bikeId: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      disableClose: true,
      backdropClass: 'backdropBackground',
      data: {
        message: 'Do you want to delete?',
        yes: 'Confirm',
        no: 'Cancel'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bikeService.deleteBike(bikeId).subscribe({
          next: response => {
            this.toaster.success("Bike deleted!");
            this.bikeDeletion.emit(true);
          },
          error: error => this.toaster.error(error.error)
        });
      }
    });
  }
}
