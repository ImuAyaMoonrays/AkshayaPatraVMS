import { Component, OnInit } from '@angular/core';
import { combineLatestWith, debounceTime, distinctUntilChanged, filter, Observable, tap } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { Store } from "@ngxs/store";
import { AppState } from "../../store/states/App.state";
import { AppActions } from "../../store/actions/app.actions";
import { map } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'jhi-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {

  events$: Observable<EventModel[]>;
  filteredEvents$: Observable<EventModel[]>;
  locationSearchEntry = new FormControl('');

  private locations = ['Jai'];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.events$ = this.store.select(AppState.upcomingEvents$);
    const eventsAfterUpdatingTypeahead$ = this.store.select(AppState.upcomingEvents$).pipe(
      filter(events => !!events),
      tap((events) => {
        this.addEventPhysicalLocations(events);
      })
    );

    this.events$ = this.locationSearchEntry.valueChanges.pipe(
      combineLatestWith(eventsAfterUpdatingTypeahead$),
      map(([locationSearchEntry, events]: [string, EventModel[]]) => {
        if (locationSearchEntry === '') return events;
        const lowercaseLocationSearchEntry = locationSearchEntry.toLowerCase();
        return events.filter((event) => {
          const physicalLocation = event.physicalLocation;
          return !!physicalLocation &&
            (physicalLocation.country?.toLowerCase().includes(lowercaseLocationSearchEntry) ||
              physicalLocation.address?.toLowerCase().includes(lowercaseLocationSearchEntry) ||
              physicalLocation.locality?.toLowerCase().includes(lowercaseLocationSearchEntry) ||
              physicalLocation.region?.toLowerCase().includes(lowercaseLocationSearchEntry) ||
              physicalLocation.city?.toLowerCase().includes(lowercaseLocationSearchEntry) ||
              physicalLocation.state?.toLowerCase().includes(lowercaseLocationSearchEntry));
        })
      })
    );


    this.store.dispatch(AppActions.UpdateUpcomingEventsAction);
    // this.events$$2 = this.events$$.pipe(
    //   tap(console.log),
    //   filter(obs => obs),
    //   mergeMap((eventObservables) => {
    //     return forkJoin(eventObservables);
    //   }),
    //   map((events: EventModel[]) => {
    //     return events.map(event => of(event));
    //   }),
    //   map(obsArr => of(obsArr))
    // )
  }


  private addEventPhysicalLocations(events: EventModel[]) {
    let locations = [];
    events.forEach(event => {
      if (event.physicalLocation) {
        locations = locations.concat([
          event.physicalLocation.locality,
          event.physicalLocation.region,
          event.physicalLocation.country,
          event.physicalLocation.city,
          event.physicalLocation.state,
          event.physicalLocation.address,
        ]);
      }
    })
    this.locations = [...new Set(locations)];
  }

  typeaheadData = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? [] : this.locations.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );


}
