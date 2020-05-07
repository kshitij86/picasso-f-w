import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/user-login.model';
import { User } from '../models/user.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private token: string;
  authStatusListener = new Subject<boolean>();
  adminStatusListener: boolean;
  verifiedStatusListener: boolean;
  loggedInUser: string;


  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getAdminStatusListener(){
    return this.adminStatusListener;
  }

  getVerifiedStatus(): Observable<{isVerified: boolean}>{
    // As verified status lives in the backend
    return this.http.get<{isVerified: boolean}>('https://picasso-backend.herokuapp.com/api/auth/signup/verified/' + this.getEmail());
  }

  // Send email to display alongwith post.
  getEmail(){
    if(this.loggedInUser){
      return this.loggedInUser;
    }
  }

  // All users for admins only
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>('https://picasso-backend.herokuapp.com/api/admin/users');
  }

  signupServiceMethod(user: User){
    this.http.post('https://picasso-backend.herokuapp.com/api/auth/signup', user)
    .subscribe((resData) => {
      console.log(resData);  //Successful user creation and needs to do verification by email
    })
  }

  loginServiceMethod(userLogin: UserLogin){
    this.http.post<any>('https://picasso-backend.herokuapp.com/api/auth/login', userLogin)
      .subscribe((resData) => {
        this.token = resData.token;
        this.adminStatusListener = resData.isAdmin;
        this.loggedInUser = userLogin.email;
        // console.log(`Is admin ? ${resData.isAdmin}`)
        if(this.token){
          this.authStatusListener.next(true);
          this.router.navigate(['']);
          this.saveAuthData(this.token);
        }
    });
  }

  logoutServiceMethod(){
    this.token = null;
    this.authStatusListener.next(false);
    this.loggedInUser = null;
    this.router.navigate(['']);
    this.clearAuthData();
  }

  // Save token to local storage
  private saveAuthData(token: string){
    localStorage.setItem('token', token);
  }

  // Delete token from ls.
  private clearAuthData(){
    localStorage.removeItem('token');
  }

  checkLocalStorage(){
    const localToken = localStorage.getItem('token');
    if(localToken){
      this.token = localToken;
      console.log(this.token);
      this.authStatusListener.next(true);
    } else {
      console.log(`Token not found or something else has gone wrong.`)
      return;
    }
  }
}
