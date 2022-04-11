import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { EventService } from "../../services/event/event.service";
import { tap } from "rxjs";
import { AppActions } from "../actions/app.actions";
import { AccountService } from "../../services/auth/account.service";
import { Account } from "../../services/auth/account.model";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { AuthoiritiesEnum } from "../../enums/authoirities.enum";
import UpdateNormalUserCompletedEvents = AppActions.UpdateNormalUserCompletedEvents;
import UpdateNormalUserRegisteredEvents = AppActions.UpdateNormalUserRegisteredEvents;
import UpdateNormalUserRegisterableEvents = AppActions.UpdateNormalUserRegisterableEvents;
import UpdateAdminPastEvents = AppActions.UpdateAdminPastEvents;
import UpdateAdminFutureEvents = AppActions.UpdateAdminFutureEvents;


export interface AppStateInterface {
  authenticatedUser: Account;
  normalUser: {
    registerableEvents: EventResponseInterface[];
    registeredEvents: EventResponseInterface[];
    completedEvents: EventResponseInterface[];
  },
  adminUser:
    {
      allFutureEvents: EventResponseInterface[];
      allCompletedEvents: EventResponseInterface[];
    }


}

@State<AppStateInterface>({
  name: 'app',
  defaults: {
    authenticatedUser: null,
    normalUser: {
      registerableEvents: null,
      registeredEvents: null,
      completedEvents: null
    },
    adminUser: {
      allFutureEvents: null,
      allCompletedEvents: null
    }
  }
})
@Injectable()
export class AppState {
  constructor(private eventService: EventService,
              private store: Store,
              private accountService: AccountService) {
  }

  @Selector()
  static authenticatedUser(state: AppStateInterface): Account {
    return state.authenticatedUser;
  }

  @Selector()
  static isAdminLoggedIn(state: AppStateInterface): boolean {
    return state.authenticatedUser?.authorities.includes(AuthoiritiesEnum.ROLE_ADMIN);
  }


  @Selector()
  static adminAllFutureEvents(state: AppStateInterface): EventResponseInterface[] {
    return state.adminUser.allFutureEvents;
  }

  @Selector()
  static adminAllPastEvents(state: AppStateInterface): EventResponseInterface[] {
    return state.adminUser.allCompletedEvents;
  }


  @Selector()
  static normalUserRegisterableEvents(state: AppStateInterface): EventResponseInterface[] {
    return state.normalUser.registerableEvents;
  }

  @Selector()
  static normalUserRegisteredEvents(state: AppStateInterface): EventResponseInterface[] {
    return state.normalUser.registeredEvents;
  }

  @Selector()
  static normalUserCompletedEvents(state: AppStateInterface): EventResponseInterface[] {
    return state.normalUser.completedEvents;
  }

  @Action(AppActions.UpdateAdminFutureEvents)
  updateAdminFutureEvents(ctx: StateContext<AppStateInterface>) {
    return this.eventService.adminAllFutureEvents$().pipe(
      tap((events) => {
        ctx.patchState({
          adminUser: {
            ...ctx.getState().adminUser,
            allFutureEvents: events
          }
        })
      })
    )
  }

  @Action(AppActions.UpdateAdminPastEvents)
  updateAdminPastEvents(ctx: StateContext<AppStateInterface>) {
    return this.eventService.adminAllPastEvents$().pipe(
      tap((events) => {
        ctx.patchState({
          adminUser: {
            ...ctx.getState().adminUser,
            allCompletedEvents: events
          }
        })
      })
    )
  }

  @Action(AppActions.UpdateNormalUserRegisterableEvents)
  updateNormalUserRegisterableEvents(ctx: StateContext<AppStateInterface>) {
    return this.eventService.userAllRegisterableEvents$().pipe(
      tap((events) => {
        ctx.patchState({
          normalUser: {
            ...ctx.getState().normalUser,
            registerableEvents: events
          }
        })
      })
    )
  }

  @Action(AppActions.UpdateNormalUserRegisteredEvents)
  updateNormalUserRegisteredEvents(ctx: StateContext<AppStateInterface>) {
    return this.eventService.userAllRegisteredEvents$().pipe(
      tap((events) => {
        ctx.patchState({
          normalUser: {
            ...ctx.getState().normalUser,
            registeredEvents: events
          }
        })
      })
    )
  }

  @Action(AppActions.UpdateNormalUserCompletedEvents)
  updateNormalUserCompletedEvents(ctx: StateContext<AppStateInterface>) {
    return this.eventService.userAllCompletedEvents$().pipe(
      tap((events) => {
        ctx.patchState({
          normalUser: {
            ...ctx.getState().normalUser,
            completedEvents: events
          }
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

  @Action(AppActions.UpdateAllNormalUserEvents)
  updateAllNormalUserEvents() {
    return this.store.dispatch([
      new UpdateNormalUserCompletedEvents(),
      new UpdateNormalUserRegisteredEvents(),
      new UpdateNormalUserRegisterableEvents()
    ]);
  }

  @Action(AppActions.UpdateAllAdminEvents)
  updateAllAdminUserEvents() {
    return this.store.dispatch([
      new UpdateAdminPastEvents(),
      new UpdateAdminFutureEvents(),
    ]);
  }


}
