import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { Select, Store } from "@ngxs/store";
import { AppState } from "../../store/states/App.state";
import { AppActions } from "../../store/actions/app.actions";

@Component({
  selector: 'jhi-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {

  @Select(AppState.upcomingEvents$) events$: Observable<EventModel[]>;

  filteredEvents$: Observable<EventModel[]>;

  constructor(private store: Store) {
  }


  ngOnInit(): void {
    this.store.dispatch(AppActions.UpdateUpcomingEventsAction);
    // this.events$$2 = this.events$$.pipe(
    //   tap(console.log),
    //   filter(obs => obs),
    //   mergeMap((eventObservables) => {
    //     return forkJoin(eventObservables);
    //   }),
    //   map((events: EventModel[]) => {
    //     return events.map(event => of(event));
    //   }),
    //   map(obsArr => of(obsArr))
    // )
  }

}
