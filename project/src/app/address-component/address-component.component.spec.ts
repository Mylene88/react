import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponentComponent } from './address-component.component';

describe('AddressComponentComponent', () => {
  let component: AddressComponentComponent;
  let fixture: ComponentFixture<AddressComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
