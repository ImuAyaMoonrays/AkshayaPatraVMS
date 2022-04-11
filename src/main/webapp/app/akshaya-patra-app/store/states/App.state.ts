import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { EventService } from "../../services/event/event.service";
import { tap } from "rxjs";
import { AppActions } from "../actions/app.actions";
import { AccountService } from "../../services/auth/account.service";
import { Account } from "../../services/auth/account.model";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";


export interface AppStateInterface {
  allEvents: EventResponseInterface[];
  authenticatedUser: Account;

}

@State<AppStateInterface>({
  name: 'app',
  defaults: {
    allEvents: null,
    authenticatedUser: null
  }
})
@Injectable()
export class AppState {
  constructor(private eventService: EventService,
              private accountService: AccountService) {
  }

  @Selector()
  static authenticatedUser(state: AppStateInterface): Account {
    return state.authenticatedUser;
  }

  @Selector()
  static allFutureEvents(state: AppStateInterface): EventResponseInterface[] {
    return state.allEvents.filter(event => (new Date(event.endDate)) >= new Date());
  }

  @Selector()
  static allPastEvents(state: AppStateInterface): EventResponseInterface[] {
    return state.allEvents.filter(event => (new Date(event.endDate)) < new Date());
  }


  @Selector()
  static upcomingUnregisteredEvents(state: AppStateInterface): EventResponseInterface[] {
    const registeredUpcomingEventsIds = this.upcomingRegisteredEvents(state).map(event => event.id);
    return this.allFutureEvents(state).filter(event => !registeredUpcomingEventsIds.includes(event.id));
  }

  @Selector()
  static upcomingRegisteredEvents(state: AppStateInterface): EventResponseInterface[] {
    return this.allFutureEvents(state).filter(event => (event.volunteers.map(volunteer => volunteer.id)).includes(state.authenticatedUser.id));
  }

  @Selector()
  static pastRegisteredEvents(state: AppStateInterface): EventResponseInterface[] {
    return this.allPastEvents(state).filter(event => (event.volunteers.map(volunteer => volunteer.id)).includes(state.authenticatedUser.id));
  }

  @Action(AppActions.UpdateAllEventsAction)
  updateUpcomingEvents(ctx: StateContext<AppStateInterface>) {
    return this.eventService.allEvents$().pipe(
      tap((events) => {
        ctx.patchState({
          allEvents: events
        })
      })
    )
  }

  @Action(AppActions.UpdateAuthenticatedUserAction)
  updateAuthenticatedUser(ctx: StateContext<AppStateInterface>, action: AppActions.UpdateAuthenticatedUserAction) {
    ctx.patchState({
      authenticatedUser: action.authenticatedUser
    });
  }


}
