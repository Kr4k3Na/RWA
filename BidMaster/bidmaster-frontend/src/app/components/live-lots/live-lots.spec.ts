import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveLots } from './live-lots';

describe('LiveLots', () => {
  let component: LiveLots;
  let fixture: ComponentFixture<LiveLots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveLots],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveLots);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
