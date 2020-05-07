import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userIsAuthenticated = false;
  socialIsAuthenticated: boolean;
  private authListenerSubs: Subscription;


  constructor(private authService: AuthenticationService) {}

  onLogOut(){
    this.authService.logoutServiceMethod();
  }

  ngOnInit(){
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
