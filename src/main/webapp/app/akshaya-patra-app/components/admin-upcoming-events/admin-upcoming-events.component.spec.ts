import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpcomingEventsComponent } from './admin-upcoming-events.component';

describe('AdminUpcomingEventsComponent', () => {
  let component: AdminUpcomingEventsComponent;
  let fixture: ComponentFixture<AdminUpcomingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpcomingEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpcomingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
