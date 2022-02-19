import { Component, OnInit } from '@angular/core';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { BehaviorSubject } from 'rxjs';
import { PrototypeConstants } from '../../constants/prototype.constants';
import { EventModel } from '../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-completed-event-for-prototype',
  templateUrl: './completed-event-for-prototype.component.html',
  styleUrls: ['./completed-event-for-prototype.component.scss'],
})
export class CompletedEventForPrototypeComponent implements OnInit {
  constructor(private prototypeService: PrototypeService, private router: Router) {}

  isAdmin$: BehaviorSubject<boolean>;
  COMPLETED_EVENTS: EventModel[] = PrototypeConstants.COMPLETED_EVENTS;

  ngOnInit(): void {
    this.isAdmin$ = this.prototypeService.isAdminAccount$;
  }

  navigateToEvent(eventId: string): void {
    this.router.navigate([`/home/event/${eventId}`]);
  }
}
