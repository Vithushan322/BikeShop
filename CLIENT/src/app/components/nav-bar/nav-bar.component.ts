import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(
    public accountService: AccountService,
    private router: Router) { }
    
  ngOnInit(): void {
    
  }

  logout() {
    this.accountService.removeCurrentUser();
    this.router.navigate(['login'])
  }
}
