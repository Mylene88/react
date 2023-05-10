import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  users: any[] = [];
  currentUser: any;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
