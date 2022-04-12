import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { AppActions } from "../../store/actions/app.actions";

@Component({
  selector: 'jhi-admin-upcoming-events',
  templateUrl: './admin-upcoming-events.component.html',
  styleUrls: ['./admin-upcoming-events.component.scss']
})
export class AdminUpcomingEventsComponent implements OnInit {

  @Select(AppState.adminAllFutureEvents) futureEvents$: Observable<EventResponseInterface[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new AppActions.UpdateAdminFutureEvents());
  }

}
