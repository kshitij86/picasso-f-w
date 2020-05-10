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
  private authListenerSubs: Subscription;
  currentUserName: string;


  constructor(private authService: AuthenticationService) {}

  onLogOut(){
    this.authService.logoutServiceMethod();
  }

  ngOnInit(){
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.currentUserName = this.authService.getCurrentUserName();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
