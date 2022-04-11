import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";

@Component({
  selector: 'jhi-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent implements OnInit {

  @Input() event: EventResponseInterface

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToEventExpandedView(eventId: string): void {
    this.router.navigate([`/home/events/${eventId}`]);
  }

}
