import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

// Check to verify of the request is an authorized one
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthenticationService){}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    const authToken = this.authService.getToken();

    const authRequestClone = request.clone({
      // Modify any outgoing request to have a valid token attached to it
      headers: request.headers.set('Authorization', "Bearer " + authToken) // Add a new header
    });
    return next.handle(authRequestClone);
  }
}
