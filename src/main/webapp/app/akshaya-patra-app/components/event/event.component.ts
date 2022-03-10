import { Component, Input, OnInit } from '@angular/core';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { PrototypeConstants } from '../../constants/prototype.constants';
import { CreateEventModel } from "../../models/create-event.model";
import { map, tap } from "rxjs/operators";
import { Account } from "../../services/auth/account.model";
import { AuthoiritiesEnum } from "../../enums/authoirities.enum";
import { AccountService } from "../../services/auth/account.service";
import { EventService } from "../../services/event/event.service";

@Component({
  selector: 'jhi-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  @Input() event: CreateEventModel;
  @Input() hideButton: boolean = false;
  //name this better. Should make isCompactView?
  @Input() isCompactView: boolean;
  isCompleted: boolean;
  isAdmin$: Observable<boolean>;

  constructor(private prototypeService: PrototypeService,
              private eventService: EventService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.isAdmin$ = this.accountService.identity().pipe(
      map((account: Account) => {
        return account.authorities.includes(AuthoiritiesEnum.ROLE_ADMIN);
      }),
    );

    if (!this.event) {
      // temporary hack, should get id from router
      const eventId = document.documentURI.slice(document.documentURI.lastIndexOf('/') + 1);
      this.eventService.eventById$(Number(eventId))
        .subscribe(event => {
          this.event = event;
        });
    }
  }
}
