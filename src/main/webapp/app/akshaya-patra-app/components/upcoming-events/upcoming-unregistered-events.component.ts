import { Component, OnInit } from '@angular/core';
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";

@Component({
  selector: 'jhi-upcoming-events',
  templateUrl: './upcoming-unregistered-events.component.html',
  styleUrls: ['./upcoming-unregistered-events.component.scss']
})
export class UpcomingUnregisteredEventsComponent implements OnInit {

  @Select(AppState.upcomingUnregisteredEvents) upcomingEvents$: Observable<EventResponseInterface[]>

  constructor() { }

  ngOnInit(): void {
  }

}
