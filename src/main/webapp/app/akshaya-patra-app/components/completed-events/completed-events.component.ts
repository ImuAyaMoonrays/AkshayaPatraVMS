import { Component, OnInit } from '@angular/core';
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { EventModel } from "../../models/event.model";
import { Select } from "@ngxs/store";

@Component({
  selector: 'jhi-completed-events',
  templateUrl: './completed-events.component.html',
  styleUrls: ['./completed-events.component.scss']
})
export class CompletedEventsComponent implements OnInit {

  @Select(AppState.pastRegisteredEvents) completedEvents$: Observable<EventModel[]>

  constructor() { }

  ngOnInit(): void {
  }

}
