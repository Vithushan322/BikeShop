import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BikeType } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';
import { ConfirmationModalComponent } from '../../components/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-create-bike',
  templateUrl: './create-bike.component.html',
  styleUrls: ['./create-bike.component.scss']
})
export class CreateBikeComponent implements OnInit {
  bikeTypes = BikeType;
  keys = Object.keys;

  createBikeForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<CreateBikeComponent>,
    private fb: FormBuilder,
    private bikeService: BikeService,
    private toaster: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.createBikeForm = this.fb.group({
      name: ['', [Validators.required]],
      referenceNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      bikeType: [this.bikeTypes.General, [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      color: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.bikeService.createBike(this.createBikeForm.value).subscribe({
      next: () => {
        this.toaster.success("Bike created!");
        this.dialogRef.close(true);
      },
      error: error => {
        console.log(error.error);
        this.toaster.error(error.error);
      }
    });
  }

  onCancel(): void {
    console.log(this.createBikeForm.pristine);
    if (this.createBikeForm?.pristine) {
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
