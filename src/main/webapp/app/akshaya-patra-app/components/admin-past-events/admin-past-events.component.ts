import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { AppActions } from "../../store/actions/app.actions";

@Component({
  selector: 'jhi-admin-past-events',
  templateUrl: './admin-past-events.component.html',
  styleUrls: ['./admin-past-events.component.scss']
})
export class AdminPastEventsComponent implements OnInit {

  @Select(AppState.adminAllPastEvents) pastEvents$: Observable<EventResponseInterface[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new AppActions.UpdateAdminPastEvents());
  }
}
