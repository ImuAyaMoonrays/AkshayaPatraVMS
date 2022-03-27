import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { EventModel } from "../../models/event.model";
import { AppActions } from "../../store/actions/app.actions";

@Component({
  selector: 'jhi-registered-events',
  templateUrl: './registered-events.component.html',
  styleUrls: ['./registered-events.component.scss']
})
export class RegisteredEventsComponent implements OnInit {

  @Select(AppState.upcomingRegisteredEvents) registeredEvents$: Observable<EventModel[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new AppActions.UpdateAllEventsAction);
  }

}
