import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error('Error parsing user:', error);
        return null;
      }
      //console.log('Stored user:', user);
      //return JSON.parse(user)
    } else {
      return null;
    }
  }

  private roles: Array<string> = [];
  public currentUser = { username: '', roles: [] };

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  public saveUser(user: any) {
    if(user){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUser = user;
    console.log('Current user: ', this.currentUser);
    } else{

        console.error('Error saving user: user is null or undefined');
    }
    //this.currentUser = user;
    //console.log('User information saved: ', user);
    //console.log('Current user: ', this.currentUser);
  }
}
