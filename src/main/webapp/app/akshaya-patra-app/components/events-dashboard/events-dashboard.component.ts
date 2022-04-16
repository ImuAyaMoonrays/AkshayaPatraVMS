import { Component, Input, OnInit } from '@angular/core';
import { combineLatestWith, debounceTime, distinctUntilChanged, filter, Observable, startWith, tap } from 'rxjs';
import { map } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { LocationTypeEnum } from "../../enums/location-type.enum";
import { TemporalUtil } from "../../utils/temporal.util";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { DatePickerDateInterface } from "../../interfaces/date-picker-date.interface";

@Component({
  selector: 'jhi-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss'],
})
export class EventsDashboardComponent implements OnInit {

  @Input() events$: Observable<EventResponseInterface[]>
  @Input() emptyFromStartText: string;

  eventsAfterFilters$: Observable<any>;
  physicalLocationSearchEntryFormControl = new FormControl('');
  selectedCauseTagsFormControl = new FormControl([]);
  locationTypeFormControl = new FormControl(null);
  minimumDateFormControl = new FormControl(null);
  maximumDateFormControl = new FormControl(null);
  disablePhysicalLocationEntry = false;
  causeTags = [];
  locationTypes = [LocationTypeEnum.PHYSICAL, LocationTypeEnum.VIRTUAL]
  isEventsEmptyFromStart: boolean;


  private locations = [];

  constructor() {
  }

  ngOnInit(): void {


    const eventsAfterUpdatingFilterOptions$ = this.events$.pipe(
      filter(events => !!events),
      tap((events) => {
        this.isEventsEmptyFromStart = events.length === 0;
        this.addEventPhysicalLocations(events);
        this.addCauseTags(events);
      })
    );

    const eventsFilteredByMinimumDate$ = this.minimumDateFormControl.valueChanges.pipe(
      startWith(null),
      combineLatestWith(eventsAfterUpdatingFilterOptions$),
      map(([date, events]: [DatePickerDateInterface, EventResponseInterface[]]) => {
        if (date) {
          return events.filter((event) => {
            const datePickerStyleEventDate = TemporalUtil.datePickerDateFromEventDateString(event.startDate as string)
            return !TemporalUtil.isSecondDateLarger(datePickerStyleEventDate, date)
          });
        } else {
          return events;
        }
      })
    )

    const eventsFilteredByMaximumDate$ = this.maximumDateFormControl.valueChanges.pipe(
      startWith(null),
      combineLatestWith(eventsAfterUpdatingFilterOptions$),
      map(([date, events]: [DatePickerDateInterface, EventResponseInterface[]]) => {
        if (date) {
          return events.filter((event) => {
            const datePickerStyleEventDate = TemporalUtil.datePickerDateFromEventDateString(event.endDate as string)
            return TemporalUtil.areDatesEqual(datePickerStyleEventDate, date) || TemporalUtil.isSecondDateLarger(datePickerStyleEventDate, date)
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
      map(([locationType, events]: [LocationTypeEnum, EventResponseInterface[]]) => {
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
      map(([causeTags, events]: [string[], EventResponseInterface[]]) => {
        return events.filter((event) => {
          const eventCauseTags = event.causes?.map(cause => cause.causeName);
          return causeTags.every(causeTag => eventCauseTags?.includes(causeTag));
        })
      })
    )

    const eventsFilteredByPhysicalLocation$ = this.physicalLocationSearchEntryFormControl.valueChanges.pipe(
      startWith(''),
      combineLatestWith(eventsAfterUpdatingFilterOptions$),
      map(([locationSearchEntry, events]: [string, EventResponseInterface[]]) => {
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

    this.eventsAfterFilters$ = eventsFilteredByTags$.pipe(
      combineLatestWith(eventsFilteredByLocationType$),
      map(([eventsFilteredByTag, eventsFilteredByLocationType]: [EventResponseInterface[], EventResponseInterface[]]) => {
        return this.intersection(eventsFilteredByLocationType, eventsFilteredByTag);
      }),
      combineLatestWith(eventsFilteredByPhysicalLocation$),
      map(([eventsFilteredByTagAndLocationType, eventsFilteredByLocation]: [EventResponseInterface[], EventResponseInterface[]]) => {
        return this.intersection(eventsFilteredByTagAndLocationType, eventsFilteredByLocation)
      }),
      combineLatestWith(eventsFilteredByMinimumDate$),
      map(([eventsFilteredByTagAndLocationTypeAndPhysicalLocation, eventsFilteredByMinimumDate$]: [EventResponseInterface[], EventResponseInterface[]]) => {
        return this.intersection(eventsFilteredByTagAndLocationTypeAndPhysicalLocation, eventsFilteredByMinimumDate$)
      }),
      combineLatestWith(eventsFilteredByMaximumDate$),
      map(([eventsFilteredByTagAndLocationTypeAndPhysicalLocationAndMaximumDate, eventsFilteredByMaximumDate$]: [EventResponseInterface[], EventResponseInterface[]]) => {
        return this.intersection(eventsFilteredByTagAndLocationTypeAndPhysicalLocationAndMaximumDate, eventsFilteredByMaximumDate$)
      }),
      map((filteredEvents: EventResponseInterface[]) => {
        return filteredEvents.sort((eventA, eventB) => {
          return new Date(eventA.startDate).getTime() - new Date(eventB.startDate).getTime();
        })
      }),
      tap(console.log)
    )
  }


  private intersection(eventsFilteredByLocationType: EventResponseInterface[], eventsFilteredByTag: EventResponseInterface[]): EventResponseInterface[] {
    const eventsByLocationType = new Set(eventsFilteredByLocationType);
    return [...new Set(eventsFilteredByTag)].filter(x => eventsByLocationType.has(x));
  }

  private addEventPhysicalLocations(events: EventResponseInterface[]) {
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

  private addCauseTags(events: EventResponseInterface[]) {
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
