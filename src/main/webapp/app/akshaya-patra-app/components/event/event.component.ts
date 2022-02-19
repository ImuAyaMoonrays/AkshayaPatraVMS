import { Component, Input, OnInit } from '@angular/core';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { BehaviorSubject } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { PrototypeConstants } from '../../constants/prototype.constants';

@Component({
  selector: 'jhi-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event: EventModel;
  @Input() isPrototypeEvent: boolean = false;
  @Input() hideButton: boolean = false;
  isCompleted: boolean;
  eventIcon: 'mdi-school' | 'mdi-food-apple' | 'mdi-water' | 'mdi-flower';
  eventColor: 'bg-gradient-danger' | 'bg-gradient-primary' | 'bg-gradient-success' | 'bg-gradient-info';
  isAdmin$: BehaviorSubject<boolean>;

  constructor(private prototypeService: PrototypeService) {}

  ngOnInit(): void {
    this.isAdmin$ = this.prototypeService.isAdminAccount$;
    if (!this.event) {
      // temporary hack, should get id from router
      const eventId = document.documentURI.slice(document.documentURI.lastIndexOf('/') + 1);
      this.prototypeService.event$
        .subscribe(events => {
          const upcomingEvent = events.find(event => event.eventId.toString() === eventId);
          if (upcomingEvent) {
            this.event = upcomingEvent;
            this.isCompleted = false;
          } else {
            this.event = PrototypeConstants.COMPLETED_EVENTS.find(event => event.eventId.toString() === eventId);
            this.isCompleted = true;
          }
        })
        .unsubscribe();
    }
    switch (this.event.cause) {
      case 'Education':
        this.eventIcon = 'mdi-school';
        this.eventColor = 'bg-gradient-primary';
        break;
      case 'Environmental Work':
        this.eventIcon = 'mdi-flower';
        this.eventColor = 'bg-gradient-danger';
        break;
      case 'Food Drive':
        this.eventIcon = 'mdi-food-apple';
        this.eventColor = 'bg-gradient-success';
        break;
      case 'Water Collection':
        this.eventIcon = 'mdi-water';
        this.eventColor = 'bg-gradient-info';
        break;
    }
  }

  registrationButtonClicked(): void {
    if (this.event.isRegistered) {
      this.deregister();
    } else {
      this.register();
    }
  }

  private register(): void {
    this.prototypeService.register(this.event);
  }

  private deregister(): void {
    this.prototypeService.deregister(this.event);
  }
}
