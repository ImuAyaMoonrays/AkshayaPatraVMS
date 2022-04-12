import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { EventService } from "../../services/event/event.service";
import { Router } from "@angular/router";
import { AccountService } from "../../services/auth/account.service";
import { map, tap } from "rxjs/operators";
import { Account } from "../../services/auth/account.model";
import { CsvExportService } from "../../services/csv-export/csv-export.service";
import { Store } from "@ngxs/store";
import { AppActions } from "../../store/actions/app.actions";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { AppState } from "../../store/states/App.state";

@Component({
  selector: 'jhi-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  event$: Observable<EventResponseInterface>;
  isPastEvent: boolean;
  @Input() hideButton: boolean = false;
  @Input() isExpandedView: boolean = true;
  isCompleted: boolean;
  buttonText: 'Register' | 'Unregister';
  buttonFunction: Function;
  forceEvent$: Subject<EventResponseInterface> = new Subject<EventResponseInterface>();

  constructor(private router: Router,
              private store: Store,
              private csvExportService: CsvExportService,
              private accountService: AccountService,
              private eventService: EventService) {
  }

  ngOnInit(): void {

    // temporary hack, should get id from router
    const eventId = document.documentURI.slice(document.documentURI.lastIndexOf('/') + 1);
    this.assignEvent(eventId);

    // this is psychotic. Refactor this.
    this.event$ = combineLatest(merge(this.event$, this.forceEvent$), this.accountService.identity()).pipe(
      tap((eventAndAccount: [EventResponseInterface, Account]) => {
        if (eventAndAccount[0].registered) {
          this.buttonText = 'Unregister';
          this.buttonFunction = this.unregister;
        } else {
          this.buttonText = 'Register';
          this.buttonFunction = this.register;
        }
      }),
      map(eventAndAccount => eventAndAccount[0]),
      tap(event => this.isPastEvent = new Date(event.endDate) < new Date()),
    );
  }

  saveCsv(eventId: number): void {
    this.csvExportService.csvOfCurrentlyRegisteredVolunteers$(eventId)

  }


  private assignEvent(eventId: string) {
    const isAdminLoggedIn = this.store.selectSnapshot(AppState.isAdminLoggedIn);
    if (isAdminLoggedIn) {
      this.event$ = this.eventService.adminEventById$(Number(eventId));
    } else {
      this.event$ = this.eventService.userEventById$(Number(eventId));
    }
  }

  public register(eventId: string): void {
    this.eventService.register$(Number(eventId)).pipe(
      tap(() => {
        // refactor this
        this.eventService.userEventById$(Number(eventId)).subscribe((event) => this.forceEvent$.next(event))
        this.store.dispatch(new AppActions.UpdateAllNormalUserEvents())
      })
    ).subscribe();
  }

  public unregister(eventId: string): void {
    this.eventService.unregister$(Number(eventId)).pipe(
      tap(() => {
        // refactor this
        this.eventService.userEventById$(Number(eventId)).subscribe((event) => this.forceEvent$.next(event))
        this.store.dispatch(new AppActions.UpdateAllNormalUserEvents())
      })
    ).subscribe();
  }


}
