import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {
  jaipurEventStatus$: Subject<{ isRegistered: boolean; numberRegistered: number }>;

  constructor(private router: Router, private prototypeService: PrototypeService) {}

  ngOnInit(): void {
    this.jaipurEventStatus$ = this.prototypeService.jaipurFoodDriveEventStatus$;
  }

  navigateToEvent(eventId: string): void {
    this.router.navigate([`/home/event/${eventId}`]);
  }
}
