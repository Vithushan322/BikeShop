import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/components/shared/confirmation-modal/confirmation-modal.component';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: User | undefined;
  currentWeather: any;

  constructor(
    public accountService: AccountService,
    public sharedService: SharedService,
    private router: Router,
    public dialog: MatDialog,
    private toaster: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => { if (user) this.user = user; }
    });
  }

  ngOnInit(): void {
    this.getCurrentWeather();
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      disableClose: true,
      backdropClass: 'backdropBackground',
      data: {
        message: 'Do you want to logout?',
        yes: 'Logout',
        no: 'Cancel'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.removeCurrentUser();
        this.router.navigate(['login'])
      }
    });
  }

  getCurrentWeather() {
    if (!!this.user) {
      this.sharedService.getCurrentWeather(this.user.location).subscribe({
        next: response => {
          this.currentWeather = response.current;
        },
        error: error => this.toaster.error(error.error)
      });
    }
  }
}
