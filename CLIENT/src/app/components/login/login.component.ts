import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  model: any = {};
  isPasswordHidden = true;
  isRememberMe = true;

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  login(){
    this.accountService.logIn(this.loginForm.value, this.isRememberMe).subscribe({
      next: () => {},
      error: error => this.toaster.error(error.error)
    });
  }

  initializeForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('vithushan.vn@gmail.com', [Validators.required,Validators.email]),
      password: new FormControl('Admin', [Validators.required, Validators.minLength(5),Validators.maxLength(15)])
    });
  }

  toDo(){
    this.toaster.error('Need to implement!')
  }
}
