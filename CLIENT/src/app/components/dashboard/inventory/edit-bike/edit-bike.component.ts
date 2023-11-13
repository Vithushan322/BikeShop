import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { Bike, BikeType } from 'src/app/models/bike';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikeService } from 'src/app/services/bike.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.scss']
})
export class EditBikeComponent implements OnInit {
  @Output() bikeUpdate = new EventEmitter();

  bikeTypes = BikeType;
  keys = Object.keys;

  editBikeForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public bike: Bike,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private bikeService: BikeService,
    private toaster: ToastrService) {
  }
  ngOnInit(): void {
    this.initializeForm(this.bike);
  }

  initializeForm(bike: Bike) {
    this.editBikeForm = this.fb.group({
      name: [bike.name, [Validators.required]],
      referenceNumber: [bike.referenceNumber, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      price: [bike.price, [Validators.required, Validators.min(1)]],
      discountedPrice: [bike.discountedPrice, []],
      bikeType: [bike.bikeType, [Validators.required]],
      description: [bike.description, [Validators.required]],
      quantity: [bike.quantity, [Validators.required, Validators.min(1)]],
      color: [bike.color, [Validators.required]],
      location: [bike.location, [Validators.required]]
    });
  }

  onSubmit() {
    this.bikeService.updateBike(this.bike.id, this.editBikeForm.value).subscribe({
      next: () => {
        this.toaster.success("Bike updated!");
        this.dialogRef.close(true);
      },
      error: error => {
        console.log(error.error);
        this.toaster.error(error.error);
      }
    });
  }

  onCancel() {
    if (this.editBikeForm?.pristine) {
      this.dialogRef.close(false);
    } else {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '400px',
        disableClose: true,
        backdropClass: 'backdropBackground',
        data: {
          message: 'There are unsaved changes. Do you still want to close?'
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close(false);
        }
      });
    }
  }
}
