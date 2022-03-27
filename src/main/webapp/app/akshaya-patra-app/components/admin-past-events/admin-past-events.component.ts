import { Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { AppState } from "../../store/states/App.state";
import { Observable } from "rxjs";
import { EventModel } from "../../models/event.model";

@Component({
  selector: 'jhi-admin-past-events',
  templateUrl: './admin-past-events.component.html',
  styleUrls: ['./admin-past-events.component.scss']
})
export class AdminPastEventsComponent implements OnInit {

  @Select(AppState.allPastEvents) pastEvents$: Observable<EventModel[]>

  constructor() { }

  ngOnInit(): void {
  }

}
