import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { PrototypeConstants } from '../../constants/prototype.constants';
import { deepCopy } from '@fullcalendar/angular/lib/utils';

@Injectable({
  providedIn: 'root',
})
export class PrototypeService implements OnInit {
  private events: EventModel[] = [...PrototypeConstants.UPCOMING_EVENTS];
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

  addEvent(event: EventModel): void {
    this.events.push(event);
    this.emitEvents();
  }

  maxEventId(): number {
    const allEvents: EventModel[] = this.events.concat(PrototypeConstants.COMPLETED_EVENTS);
    let maxEventNumber = 0;
    for (let event of allEvents) {
      if (event.eventId > maxEventNumber) {
        maxEventNumber = event.eventId;
      }
    }
    return maxEventNumber;
  }
}
