import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProfile } from './product-profile';

describe('ProductProfile', () => {
  let component: ProductProfile;
  let fixture: ComponentFixture<ProductProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
