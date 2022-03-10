import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PrototypeConstants } from '../../constants/prototype.constants';
import { EventModel } from '../../models/event.model';
import { map } from 'rxjs/operators';
import { CreateEventModel } from "../../models/create-event.model";
import { EventService } from "../../services/event/event.service";

@Component({
  selector: 'jhi-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {

  events$: Observable<CreateEventModel[]>;

  constructor(private router: Router,
              private eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = this.eventService.allEvents$();
  }

  navigateToEvent(eventId: string): void {
    this.router.navigate([`/home/event/${eventId}`]);
  }
}
