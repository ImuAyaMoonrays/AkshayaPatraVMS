import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { EventModel } from "../../models/event.model";
import { EventService } from "../../services/event/event.service";
import { Observable, of, tap } from "rxjs";
import { AppActions } from "../actions/app.actions";


export interface AppStateInterface {
  upcomingEvents: EventModel[];

}

@State<AppStateInterface>({
  name: 'app',
  defaults: {
    upcomingEvents: null

  }
})
@Injectable()
export class AppState {
  constructor(private eventService: EventService) {
  }

  @Selector()
  static upcomingEvents$(state: AppStateInterface): Observable<EventModel>[] {
    return state.upcomingEvents.map(event => of(event));

  }

  @Action(AppActions.UpdateUpcomingEventsAction)
  updateUpcomingEvents(ctx: StateContext<AppStateInterface>) {
    return this.eventService.allEvents$().pipe(
      tap((events) => {
        ctx.patchState({
          upcomingEvents: events
        })
      })
    )
  }



}
