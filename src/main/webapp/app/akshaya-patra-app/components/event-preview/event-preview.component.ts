import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from "../../models/event.model";
import { Router } from "@angular/router";

@Component({
  selector: 'jhi-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent implements OnInit {

  @Input() event: EventModel

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToEventExpandedView(eventId: string): void {
    this.router.navigate([`/home/events/${eventId}`]);
  }

}
