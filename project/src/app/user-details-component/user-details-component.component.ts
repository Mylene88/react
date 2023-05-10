import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-component.component.html',
  styleUrls: ['./user-details-component.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: any;
  currentUser: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe((data: any) => {
      this.user = data;
      this.userService.getCurrentUser().subscribe((currentUser: any) => {
        this.currentUser = currentUser;
      });
    });
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  isCurrentUser(): boolean {
    return this.currentUser && this.user && this.currentUser.id === this.user.id;
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  onDelete() {
    if (this.isAdmin()) {
      this.deleteProfile().subscribe(() => {
        console.log('User deleted and navigation performed.');
      });
    } else {
      console.log('You are not authorized to delete this user.');
    }
  }


  deleteProfile(): Observable<any> {
    return this.userService.deleteUser(this.user.id).pipe(
      tap(() => {this.router.navigate(['/']);
      })
    );
  }
}
