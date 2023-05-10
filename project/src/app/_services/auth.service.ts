import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConstants } from '../common/app.constants';
import { TokenStorageService } from '../_services/token-storage.service';

const AUTH_API = 'http://localhost:8090/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ token: any; user: any; }>(AUTH_API + 'authenticate', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions)
    .pipe(
      tap((response: { token: any; user: any; }) => {
          console.log('Login response: ', response);
          this.tokenStorage.saveToken(response.token);
          this.tokenStorage.saveUser(response.user);
      })
  );
  }

  register(user: { username: string; password: string}): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username: user.username,
      password: user.password,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }
}

