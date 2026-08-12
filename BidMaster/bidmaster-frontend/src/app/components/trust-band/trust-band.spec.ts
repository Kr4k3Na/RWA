import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustBand } from './trust-band';

describe('TrustBand', () => {
  let component: TrustBand;
  let fixture: ComponentFixture<TrustBand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustBand],
    }).compileComponents();

    fixture = TestBed.createComponent(TrustBand);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
