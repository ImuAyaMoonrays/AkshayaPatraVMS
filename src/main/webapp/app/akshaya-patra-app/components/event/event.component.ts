import { Component, OnInit } from '@angular/core';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'jhi-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  jaipurStatus$: BehaviorSubject<{ isRegistered: boolean; numberRegistered: number }>;
  isRegistered: boolean;

  constructor(private prototypeService: PrototypeService) {}

  ngOnInit(): void {
    this.jaipurStatus$ = this.prototypeService.jaipurFoodDriveEventStatus$;
    this.jaipurStatus$.subscribe(status => {
      this.isRegistered = status.isRegistered;
    });
  }

  registrationButtonClick() {
    if (this.isRegistered) {
      this.unregisterForEvent();
    } else {
      this.signUpForEvent();
    }
  }

  signUpForEvent(): void {
    this.prototypeService.registerForFoodDrive();
  }

  unregisterForEvent(): void {
    this.prototypeService.unregisterForFoodDrive();
  }
}
