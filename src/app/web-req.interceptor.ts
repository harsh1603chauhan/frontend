import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request) ?? new HttpRequest<any>('GET', ''); 
  
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => error); // Use factory function to create the error
      })
    );
  }

  addAuthHeader(request:HttpRequest<any>){
    const token=this.authService.getAccessToken();
    if(token){
      return request.clone({
        setHeaders:{
          'x-access-token':token
        }
      })
    }
    return request;
  }
}
