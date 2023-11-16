import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.apiUrl;

  private currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router) { }

  logIn(model: any, isRememberUser: boolean = true) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        if (response) {
          response.isRememberUser = isRememberUser;
          console.log(response);

          this.setCurrentUser(response)
          this.router.navigate(['dashboard']);
        }
      })
    );
  }

  registerUser() {
    return this.http.post<any>(this.baseUrl + 'account/register',
      {
        email: "vithushan.vn@gmail.com",
        password: "Admin",
        firstName: "Vithushan",
        lastName: "Navanathan",
        location: "Ottawa"
      }
    );
  }

  logout() {
    this.removeCurrentUser();
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);
  }

  removeCurrentUser() {
    if (!!localStorage.getItem('user')) localStorage.removeItem('user');
    this.currentUser.next(null);
  }

  getUsers() {
    return this.http.get<any>(this.baseUrl + 'user');
  }

  getUser(id: number) {
    return this.http.get<any>(this.baseUrl + 'user/' + id);
  }

  IsValidToken(token: string): boolean {
    let decoded = jwtDecode<any>(token!);

    if (!(!!decoded)) return false;

    let expiryDate = new Date(decoded.exp * 1000);

    if (expiryDate.getTime() <= new Date().getTime()) return false

    return true;
  }
}
