import { Component, OnInit } from '@angular/core';
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { AppActions } from "../../store/actions/app.actions";

@Component({
  selector: 'jhi-completed-events',
  templateUrl: './completed-events.component.html',
  styleUrls: ['./completed-events.component.scss']
})
export class CompletedEventsComponent implements OnInit {

  @Select(AppState.normalUserCompletedEvents) completedEvents$: Observable<EventResponseInterface[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new AppActions.UpdateNormalUserCompletedEvents());
  }

}
