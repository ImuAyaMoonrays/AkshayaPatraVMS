import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { PrototypeConstants } from '../../constants/prototype.constants';

@Injectable({
  providedIn: 'root',
})
export class PrototypeService implements OnInit {
  events: EventModel[] = PrototypeConstants.EVENTS;
  isAdminAccount$ = new BehaviorSubject<boolean>(false);
  event$ = new BehaviorSubject<EventModel[]>(this.events);

  constructor() {}

  ngOnInit() {}

  register(registeredEvent: EventModel): void {
    const event = this.events.find(event => event.isEqual(registeredEvent));
    event.currentVolunteerCount += 1;
    event.isRegistered = true;
    this.emitEvents();
  }

  deregister(deregisteredEvent: EventModel): void {
    const event = this.events.find(event => event.isEqual(deregisteredEvent));
    event.currentVolunteerCount -= 1;
    event.isRegistered = false;
    this.emitEvents();
  }

  private emitEvents(): void {
    this.event$.next(this.events);
  }

  adminLogin(): void {
    this.isAdminAccount$.next(true);
  }

  logout(): void {
    this.isAdminAccount$.next(false);
  }
}
