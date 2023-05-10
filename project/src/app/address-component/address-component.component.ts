import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Address } from './address';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address-component.component.html',
  styleUrls: ['./address-component.component.css']
})
export class AddressComponent implements OnInit {

  addresses: Address[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.addresses = user.addresses;
    });
  }

  addAddress(): Observable<any> {
    const newAddress: Address = {
      street: '123 Main St', postalCode: '12345', city: 'Anytown', country: 'USA', id : 0
    };
    return this.userService.addAddress(newAddress).pipe(
      tap((user: any) => {
        this.addresses = user.addresses;
      })
    );
  }

  editAddress(address: Address): Observable<any> {
    const updatedAddress: Address = { ...address, city: 'New City' };
    return this.userService.updateAddress(updatedAddress).pipe(
      tap((user: any) => {
        this.addresses = user.addresses;
      })
    );
  }

  deleteAddress(address: Address): Observable<any> {
    return this.userService.deleteAddress(address.id).pipe(
      tap((user: any) => {
        this.addresses = user.addresses;
      })
    );
  }
}
