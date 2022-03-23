import { Component, OnInit } from '@angular/core';
import { combineLatestWith, debounceTime, distinctUntilChanged, filter, Observable, startWith, tap } from 'rxjs';
import { EventModel } from '../../models/event.model';
import { Store } from "@ngxs/store";
import { AppState } from "../../store/states/App.state";
import { AppActions } from "../../store/actions/app.actions";
import { map } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { LocationTypeEnum } from "../../enums/location-type.enum";
import { TemporalUtil } from "../../utils/temporal.util";

@Component({
  selector: 'jhi-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {

  events$: Observable<EventModel[]>;
  physicalLocationSearchEntryFormControl = new FormControl('');
  selectedCauseTagsFormControl = new FormControl([]);
  locationTypeFormControl = new FormControl(null);
  minimumDateFormControl = new FormControl(null);
  maximumDateFormControl = new FormControl(null);
  disablePhysicalLocationEntry = false;
  causeTags = [];
  locationTypes = [LocationTypeEnum.PHYSICAL, LocationTypeEnum.VIRTUAL]


  private locations = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {


    const eventsAfterUpdatingFilterOptions$ = this.store.select(AppState.upcomingEvents$).pipe(
      filter(events => !!events),
      tap((events) => {
        this.addEventPhysicalLocations(events);
        this.addCauseTags(events);
      })
    );

    const eventsFilteredByMinimumDate$ = this.minimumDateFormControl.valueChanges.pipe(
      startWith(null),
      map(date => date && TemporalUtil.dateFromDatePicker(date)),
      combineLatestWith(eventsAfterUpdatingFilterOptions$),
      map(([date, events]: [Date, EventModel[]]) => {
        if (date) {
          return events.filter((event) => {
            return (new Date(event.startDate)) >= date;
          });
        } else {
          return events;
        }
      })
    )

    const eventsFilteredByMaximumDate$ = this.maximumDateFormControl.valueChanges.pipe(
      startWith(null),
      map(date => date && TemporalUtil.dateFromDatePicker(date)),
      combineLatestWith(eventsAfterUpdatingFilterOptions$),
      map(([date, events]: [Date, EventModel[]]) => {
        if (date) {
          return events.filter((event) => {
            return (new Date(event.endDate)) <= date;
          });
        } else {
          return events;
        }
      })
    )

    const eventsFilteredByLocationType$ = this.locationTypeFormControl.valueChanges.pipe(
      startWith(null),
      tap((locationType: LocationTypeEnum) => {
        if (locationType === LocationTypeEnum.VIRTUAL) {
          this.disablePhysicalLocationEntry = true;
          this.physicalLocationSearchEntryFormControl.setValue('');
        } else {
          this.disablePhysicalLocationEntry = false
        }
      }),
      combineLatestWith(eventsAfterUpdatingFilterOptions$),
      map(([locationType, events]: [LocationTypeEnum, EventModel[]]) => {
        if (locationType) {
          return events.filter((event) => {
            if (locationType === LocationTypeEnum.VIRTUAL) {
              return !!event.virtualLocation;
            } else if (locationType === LocationTypeEnum.PHYSICAL) {
              return !!event.physicalLocation;
            }
          })
        } else {
          return events;
        }
      })
    )

    const eventsFilteredByTags$ = this.selectedCauseTagsFormControl.valueChanges.pipe(
      startWith([]),
      combineLatestWith(eventsAfterUpdatingFilterOptions$),
      map(([causeTags, events]: [string[], EventModel[]]) => {
        return events.filter((event) => {
          const eventCauseTags = event.causes.map(cause => cause.causeName);
          return causeTags.every(causeTag => eventCauseTags.includes(causeTag));
        })
      })
    )

    const eventsFilteredByPhysicalLocation$ = this.physicalLocationSearchEntryFormControl.valueChanges.pipe(
      startWith(''),
      combineLatestWith(eventsAfterUpdatingFilterOptions$),
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

    this.events$ = eventsFilteredByTags$.pipe(
      combineLatestWith(eventsFilteredByLocationType$),
      map(([eventsFilteredByTag, eventsFilteredByLocationType]: [EventModel[], EventModel[]]) => {
        return this.intersection(eventsFilteredByLocationType, eventsFilteredByTag);
      }),
      combineLatestWith(eventsFilteredByPhysicalLocation$),
      map(([eventsFilteredByTagAndLocationType, eventsFilteredByLocation]: [EventModel[], EventModel[]]) => {
        return this.intersection(eventsFilteredByTagAndLocationType, eventsFilteredByLocation)
      }),
      combineLatestWith(eventsFilteredByMinimumDate$),
      map(([eventsFilteredByTagAndLocationTypeAndPhysicalLocation, eventsFilteredByMinimumDate$]: [EventModel[], EventModel[]]) => {
        return this.intersection(eventsFilteredByTagAndLocationTypeAndPhysicalLocation, eventsFilteredByMinimumDate$)
      }),
      combineLatestWith(eventsFilteredByMaximumDate$),
      map(([eventsFilteredByTagAndLocationTypeAndPhysicalLocationAndMaximumDate, eventsFilteredByMaximumDate$]: [EventModel[], EventModel[]]) => {
        return this.intersection(eventsFilteredByTagAndLocationTypeAndPhysicalLocationAndMaximumDate, eventsFilteredByMaximumDate$)
      }),
    )

    this.store.dispatch(AppActions.UpdateUpcomingEventsAction);
  }


  private intersection(eventsFilteredByLocationType: EventModel[], eventsFilteredByTag: EventModel[]): EventModel[] {
    const eventsByLocationType = new Set(eventsFilteredByLocationType);
    return [...new Set(eventsFilteredByTag)].filter(x => eventsByLocationType.has(x));
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

  private addCauseTags(events: EventModel[]) {
    let causeTags = [];
    events.forEach(event => {
      if (event.causes) {
        causeTags = causeTags.concat(event.causes.map(cause => cause.causeName));
      }
    })
    this.causeTags = [...new Set(causeTags)];
  }

  locationTypeaheadData = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? [] : this.locations.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

}
