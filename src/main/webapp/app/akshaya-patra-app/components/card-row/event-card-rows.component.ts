import { Component, Input, OnInit } from '@angular/core';
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'jhi-event-card-rows',
  templateUrl: './event-card-rows.component.html',
  styleUrls: ['./event-card-rows.component.scss']
})
export class EventCardRowsComponent implements OnInit {

  @Input() events$: Observable<EventResponseInterface[]>;
  @Input() emptyFromStartText: string;
  @Input() isEmptyFromStart: boolean;
  eventRows$: Observable<EventResponseInterface[]>;


  rows: EventResponseInterface[];

  constructor() {
  }

  ngOnInit(): void {
    this.eventRows$ = this.events$.pipe(
      map((events) => {
        let rows = [];
        for (let i = 0; i < events.length; i += 3) {
          rows.push(events.slice(i, i + 3));
        }
        return rows;
      })
    )

  }

}
