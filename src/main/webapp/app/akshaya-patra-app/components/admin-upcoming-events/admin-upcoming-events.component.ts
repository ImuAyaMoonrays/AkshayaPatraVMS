import { Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";

@Component({
  selector: 'jhi-admin-upcoming-events',
  templateUrl: './admin-upcoming-events.component.html',
  styleUrls: ['./admin-upcoming-events.component.scss']
})
export class AdminUpcomingEventsComponent implements OnInit {

  @Select(AppState.allFutureEvents) futureEvents$: Observable<EventResponseInterface[]>

  constructor() { }

  ngOnInit(): void {
  }

}
