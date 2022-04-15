import { Component, Input, OnInit } from '@angular/core';
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";

@Component({
  selector: 'jhi-event-card-rows',
  templateUrl: './event-card-rows.component.html',
  styleUrls: ['./event-card-rows.component.scss']
})
export class EventCardRowsComponent implements OnInit {

  @Input() events: EventResponseInterface[];
  @Input() emptyText: string;


  rows: EventResponseInterface[];

  constructor() {
  }

  ngOnInit(): void {

    var rows = [];
    for (let i = 0; i < this.events.length; i += 3) {
      rows.push(this.events.slice(i, i + 3));
    }

    this.rows = rows;
  }

}
