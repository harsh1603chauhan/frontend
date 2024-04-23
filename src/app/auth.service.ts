import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');
        if (accessToken && refreshToken) {
          this.setSession(res.body._id, accessToken, refreshToken);
          console.log("LOGGED IN!");
        } else {
          console.error('Access token or refresh token is missing in response headers.');
        }
      })
      
    )
  }


  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');
        if (accessToken && refreshToken) {
          this.setSession(res.body._id, accessToken, refreshToken);
          console.log("LOGGED IN!");
        } else {
          console.error('Access token or refresh token is missing in response headers.');
        }
      })
      
    )
  }



  logout() {
    this.removeSession();

    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }
  
  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

 
  getNewAccessToken() {
    // Get refresh token and user ID
    const refreshToken = this.getRefreshToken() || ''; // Use empty string if null
    const userId = this.getUserId() || ''; // Use empty string if null
  
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': refreshToken,
        '_id': userId
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token') || ''); // Use empty string if null
      })
    );
  }
  
}