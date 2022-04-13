import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardRowsComponent } from './event-card-rows.component';

describe('CardRowComponent', () => {
  let component: EventCardRowsComponent;
  let fixture: ComponentFixture<EventCardRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCardRowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
