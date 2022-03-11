import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { EventModel } from "../../models/event.model";
import { EventService } from "../../services/event/event.service";
import { Router } from "@angular/router";
import { AccountService } from "../../services/auth/account.service";
import { map, tap } from "rxjs/operators";
import { Account } from "../../services/auth/account.model";

@Component({
  selector: 'jhi-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  @Input() event$: Observable<EventModel>;
  @Input() hideButton: boolean = false;
  @Input() isExpandedView: boolean = true;
  isCompleted: boolean;
  isAdmin$: Observable<boolean>;
  buttonText: 'Register' | 'Unregister';
  buttonFunction: Function;

  constructor(private router: Router,
              private accountService: AccountService,
              private eventService: EventService) {
  }

  ngOnInit(): void {

    this.isAdmin$ = this.accountService.isAdminLoggedIn$();
    if (!this.event$) {
      // temporary hack, should get id from router
      const eventId = document.documentURI.slice(document.documentURI.lastIndexOf('/') + 1);
      this.assignEvent(eventId);
    }
    this.reassignEventAndAlterButtonFunctionality();
  }

  private reassignEventAndAlterButtonFunctionality() {
    this.event$ = forkJoin(this.event$, this.accountService.identity()).pipe(
      tap((eventAndAccount: [EventModel, Account]) => {
        if (eventAndAccount[0].volunteers.map(volunteer => volunteer.id).includes(eventAndAccount[1].id)) {
          this.buttonText = 'Unregister';
          this.buttonFunction = this.unregister;
        } else {
          this.buttonText = 'Register';
          this.buttonFunction = this.register;
        }
      }),
      map(eventAndAccount => eventAndAccount[0])
    )
  }

  private assignEvent(eventId: string) {
    this.event$ = this.eventService.eventById$(Number(eventId));
  }

  navigateToEventExpandedView(eventId: string): void {
    this.router.navigate([`/home/event/${eventId}`]);
  }

  public register(eventId: string): void {
    this.eventService.register$(Number(eventId)).pipe(
      tap(() => {
        this.assignEvent(eventId);
        this.reassignEventAndAlterButtonFunctionality();
      })
    ).subscribe();
  }
  public unregister(eventId: string): void {
    this.eventService.unregister$(Number(eventId)).pipe(
      tap(() => {
        this.assignEvent(eventId);
        this.reassignEventAndAlterButtonFunctionality();
      })
    ).subscribe();
  }


}
