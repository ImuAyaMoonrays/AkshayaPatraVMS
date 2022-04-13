import { Component, Input, OnInit } from '@angular/core';
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { NavigationService } from "../../services/navigation/navigation.service";

@Component({
  selector: 'jhi-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent implements OnInit {

  @Input() event: EventResponseInterface

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  navigateToEventExpandedView(eventId: string): void {
    this.navigationService.navigateToSingleEventView(eventId);
  }

}
