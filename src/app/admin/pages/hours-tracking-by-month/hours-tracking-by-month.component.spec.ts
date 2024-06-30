import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursTrackingByMonthComponent } from './hours-tracking-by-month.component';

describe('HoursTrackingByMonthComponent', () => {
  let component: HoursTrackingByMonthComponent;
  let fixture: ComponentFixture<HoursTrackingByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursTrackingByMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoursTrackingByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
