import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { first, map } from 'rxjs';
import { User } from '../models/user';
import { Token } from '@angular/compiler';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AccountService);

  if (!!localStorage.getItem('user')) {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    let isValidToken: boolean = accountService.IsValidToken(user.token!);
    if (isValidToken) {
      return true;
    } else {
      accountService.removeCurrentUser();
      router.navigate(['login']);
      return false;
    }
  }

  router.navigate(['login'])
  return false;
};


