import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/components/shared/confirmation-modal/confirmation-modal.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void { }

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
}
