import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { map } from 'rxjs/operators';
import { EventService } from "../../services/event/event.service";

@Component({
  selector: 'jhi-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {

  events$: Observable<Observable<EventModel>[]>;

  constructor(private router: Router,
              private eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = this.eventService.allEvents$().pipe(
      map((events) => {
        return events.map(event => of(event));
      })
    );
  }

}
