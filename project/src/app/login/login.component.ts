import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit{
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
welcomeMessage: any;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const token: string | null = this.route.snapshot.queryParamMap.get('token') || '';
    const error: string | null = this.route.snapshot.queryParamMap.get('error') || '';
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
  }
  else if(token){
    this.tokenStorage.saveToken(token);
    this.userService.getCurrentUser().subscribe(
          data => {
            this.login(data);
          },
          err => {
            this.errorMessage = err.error?.message || 'unknown error';
            this.isLoginFailed = true;
          }
      );
}
else if(error){
    this.errorMessage = error;
    this.isLoginFailed = true;
}
}

onSubmit(): void {
  this.authService.login(this.form).subscribe(
    data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.login(data.user);
    },
    err => {
      this.errorMessage = err.error?.message || 'unknown error';
      this.isLoginFailed = true;
    }
  );
}

login(user: any): void {
  this.tokenStorage.saveUser(user);
  this.isLoginFailed = false;
  this.isLoggedIn = true;
  this.currentUser = this.tokenStorage.getUser();
  window.location.reload();
}
}

@NgModule({
  declarations: [ LoginComponent ],
  imports: [ FormsModule, CommonModule ],
  providers: [ AuthService, TokenStorageService, UserService ],
})
export class LoginModule { }

