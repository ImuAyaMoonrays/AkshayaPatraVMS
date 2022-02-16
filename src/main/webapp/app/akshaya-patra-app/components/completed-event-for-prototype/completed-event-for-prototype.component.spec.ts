import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedEventForPrototypeComponent } from './completed-event-for-prototype.component';

describe('CompletedEventForPrototypeComponent', () => {
  let component: CompletedEventForPrototypeComponent;
  let fixture: ComponentFixture<CompletedEventForPrototypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedEventForPrototypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedEventForPrototypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
