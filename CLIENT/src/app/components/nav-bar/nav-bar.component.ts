import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(
    private accountService: AccountService,
    private router: Router) { }

  logout() {
    this.accountService.removeCurrentUser();
    this.router.navigate(['login'])
  }
}
