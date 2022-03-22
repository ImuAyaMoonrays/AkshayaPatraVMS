import { Component, isDevMode, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventService } from "../../services/event/event.service";
import { EventModel } from "../../models/event.model";
import { VirtualLocationModel } from "../../models/virtual-location.model";
import { PhysicalLocationModel } from "../../models/physical-location.model";

@Component({
  selector: 'jhi-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private eventService: EventService) {
  }

  ngOnInit() {
    if (isDevMode()) {
      this.addTestData();
    }

    // Scroll to top after route change
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  private addTestData() {
    this.eventService.createEvent$(new EventModel('Water Drive',
      'this is an event to collect water. We will be collecting 45 gallons of water. It must be filtered but it must not be cold.',
      55,
      new Date(2022, 5, 11),
      new Date(2022, 5, 13),
      {hours: 5, minutes: 40},
      {hours: 6, minutes: 35},
      'bob',
      '222-222-2222',
      'bob@gmail.com',
      null,
      null,
      new VirtualLocationModel('location.com', 'password'))).subscribe();
    this.eventService.createEvent$(new EventModel('Water Drive',
      'this is an event to collect water. We will be collecting 45 gallons of water. It must be filtered but it must not be cold.',
      55,
      new Date(2022, 5, 11),
      new Date(2022, 5, 13),
      {hours: 5, minutes: 40},
      {hours: 6, minutes: 35},
      'bob',
      '222-222-2222',
      'bob@gmail.com',
      null,
      new PhysicalLocationModel('555 Jaipur Street', 'Jaislemare', 'Jaipur', 'south district 6', 'South', 'India'))).subscribe();
  }
}
