import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursTrackingComponent } from './hours-tracking.component';

describe('HoursTrackingComponent', () => {
  let component: HoursTrackingComponent;
  let fixture: ComponentFixture<HoursTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoursTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
