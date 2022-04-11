import { Component, OnInit } from '@angular/core';
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { AppActions } from "../../store/actions/app.actions";

@Component({
  selector: 'jhi-upcoming-events',
  templateUrl: './upcoming-unregistered-events.component.html',
  styleUrls: ['./upcoming-unregistered-events.component.scss']
})
export class UpcomingUnregisteredEventsComponent implements OnInit {

  @Select(AppState.normalUserRegisterableEvents) upcomingEvents$: Observable<EventResponseInterface[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new AppActions.UpdateNormalUserRegisterableEvents());
  }

}
