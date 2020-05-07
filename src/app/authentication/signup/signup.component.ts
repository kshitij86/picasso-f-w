import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/auth.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthenticationService,
    private router: Router) { }

  onSignUp(form: NgForm){
    if(form.invalid){
      return;
    }

    const user: User = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      isAdmin: false,
      isVerified: false
    }

    this.authService.signupServiceMethod(user);

    console.log('User created');

    // Post signup stuff
    form.resetForm();
    this.router.navigate(['']);
  }


  ngOnInit(): void {
  }

}
