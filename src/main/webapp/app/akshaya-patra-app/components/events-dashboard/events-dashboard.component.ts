import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PrototypeConstants } from '../../constants/prototype.constants';
import { EventModel } from '../../models/event.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'jhi-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {
  events$: Observable<EventModel[]>;

  constructor(private router: Router, private prototypeService: PrototypeService) {}

  ngOnInit(): void {
    this.events$ = this.prototypeService.event$.pipe(
      map(events => {
        return events.sort((event0: EventModel, event1: EventModel) => {
          return event0.date.getTime() - event1.date.getTime();
        });
      })
    );
  }

  navigateToEvent(eventId: string): void {
    this.router.navigate([`/home/event/${eventId}`]);
  }
}
