import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { Subject } from 'rxjs';
import { PrototypeConstants } from '../../constants/prototype.constants';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'jhi-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {
  EVENTS: EventModel[] = PrototypeConstants.EVENTS;

  constructor(private router: Router, private prototypeService: PrototypeService) {}

  ngOnInit(): void {}

  navigateToEvent(eventId: string): void {
    this.router.navigate([`/home/event/${eventId}`]);
  }
}
