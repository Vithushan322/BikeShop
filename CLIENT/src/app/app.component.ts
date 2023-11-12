import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Bike Inventory Management';

  @HostListener('window:unload', ['$event'])
  onWindowClose(event: any): void {
    // localStorage.clear();
  }

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  ngOnDestroy(): void {
    // localStorage.clear();
  }

  setCurrentUser() {
    if (!!localStorage.getItem('user')) {
      const user: User = JSON.parse(localStorage.getItem('user')!);
      this.accountService.setCurrentUser(user);
    }
  }
}
