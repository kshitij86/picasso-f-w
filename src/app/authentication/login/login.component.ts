import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLogin } from '../../models/user-login.model';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private token: string;

  constructor(public authService: AuthenticationService,
    private router: Router) { }

  // Cannot send this token to AuthInterceptor for verification
  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }

    const userLogin: UserLogin = {
      email: form.value.email,
      password: form.value.password
    }

    this.authService.loginServiceMethod(userLogin);
    this.token = this.authService.getToken();

    // Post login
    form.resetForm();
    this.router.navigate(['']);
  }
  ngOnInit(): void {
  }

}
