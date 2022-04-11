import { Component, OnInit } from '@angular/core';
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";

@Component({
  selector: 'jhi-completed-events',
  templateUrl: './completed-events.component.html',
  styleUrls: ['./completed-events.component.scss']
})
export class CompletedEventsComponent implements OnInit {

  @Select(AppState.pastRegisteredEvents) completedEvents$: Observable<EventResponseInterface[]>

  constructor() { }

  ngOnInit(): void {
  }

}
