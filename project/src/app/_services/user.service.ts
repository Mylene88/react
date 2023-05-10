import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { Address } from '../address-component/address';

const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };


@Injectable({
  providedIn: 'root'
})
export class UserService {
  deleteAddress(id: number): Observable<any> {
    const url = `${this.API_URL}/addresses/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      catchError((err) => {
        console.error(err);
        return throwError('Failed to delete address.');
      })
    );
  }
  updateAddress(updatedAddress: Address): Observable<any> {
    const url = `${this.API_URL}address/${updatedAddress.id}`;
    return this.http.put(url, updatedAddress, httpOptions).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError('An error occurred while updating the address.');
      })
    );
  }
  addAddress(newAddress: Address): Observable<any> {
    return this.http.post(AppConstants.API_URL + 'user/address', newAddress, httpOptions);
  }
  deleteUser(id: number): Observable<any> {
    const url = `${this.API_URL}users/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      tap(() => console.log(`Deleted user with id=${id}`)),
      catchError(this.handleError<any>('deleteUser'))
    );
  }
  handleError<T>(arg0: string): (err: any, caught: Observable<Object>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }
  private readonly API_URL = 'http://localhost:8090/';
  getUser: any;

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user/me', httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
