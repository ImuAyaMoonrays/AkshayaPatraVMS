import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPastEventsComponent } from './admin-past-events.component';

describe('AdminPastEventsComponent', () => {
  let component: AdminPastEventsComponent;
  let fixture: ComponentFixture<AdminPastEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPastEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPastEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
