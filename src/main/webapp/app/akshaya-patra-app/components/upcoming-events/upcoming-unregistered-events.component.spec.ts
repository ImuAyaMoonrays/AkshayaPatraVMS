import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingUnregisteredEventsComponent } from './upcoming-unregistered-events.component';

describe('UpcomingEventsComponent', () => {
  let component: UpcomingUnregisteredEventsComponent;
  let fixture: ComponentFixture<UpcomingUnregisteredEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingUnregisteredEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingUnregisteredEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
