import { Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { EventModel } from "../../models/event.model";

@Component({
  selector: 'jhi-admin-upcoming-events',
  templateUrl: './admin-upcoming-events.component.html',
  styleUrls: ['./admin-upcoming-events.component.scss']
})
export class AdminUpcomingEventsComponent implements OnInit {

  @Select(AppState.allFutureEvents) futureEvents$: Observable<EventModel[]>

  constructor() { }

  ngOnInit(): void {
  }

}
