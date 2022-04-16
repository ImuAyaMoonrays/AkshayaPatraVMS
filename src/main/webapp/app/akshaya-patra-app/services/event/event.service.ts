import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { Observable } from "rxjs";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { CreateEventInterface } from "../../interfaces/event/create-event.interface";
import { ImageService } from "../image/image.service";
import { mergeMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly API_PREFIX = '/api'
  private readonly ADMIN_PREFIX = `${this.API_PREFIX}/admin/events`
  private readonly USER_PREFIX = `${this.API_PREFIX}/user/events`

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService, private imageService: ImageService) {
  }

  createEvent$(eventCreationPayload: CreateEventInterface, file: File): Observable<EventResponseInterface> {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('file', file, file?.name);
    }
    formData.append('eventWithoutImage', new Blob([JSON.stringify(eventCreationPayload)], {
      type: "application/json"
    }));
    return this.http.post<EventResponseInterface>(this.applicationConfigService.getEndpointFor(`${this.ADMIN_PREFIX}/createEvent`), formData);
  }

  adminDeleteEvent$(eventId: String): Observable<any> {
    return this.http.delete<any>(this.applicationConfigService.getEndpointFor(`${this.ADMIN_PREFIX}/${eventId}`)).pipe(
      tap(() => this.imageService.clearImageCache())
    );
  }

  adminAllFutureEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.ADMIN_PREFIX}/allFuture`)).pipe(
      mergeMap(events => this.imageService.eventsAfterUpdatingImageCache$(events))
    );
  }

  adminAllPastEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.ADMIN_PREFIX}/allPast`)).pipe(
      mergeMap(events => this.imageService.eventsAfterUpdatingImageCache$(events))
    );
  }

  adminEventById$(id: number): Observable<EventResponseInterface> {
    return this.http.get<EventResponseInterface>(this.applicationConfigService.getEndpointFor(`${this.ADMIN_PREFIX}/${id}`)).pipe(
      mergeMap(event => this.imageService.eventAfterUpdatingImageCache$(event))
    );
  }

  userEventById$(id: number): Observable<EventResponseInterface> {
    return this.http.get<EventResponseInterface>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/${id}`)).pipe(
      mergeMap(event => this.imageService.eventAfterUpdatingImageCache$(event))
    );
  }

  userAllRegisterableEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/registerable`)).pipe(
      mergeMap(events => this.imageService.eventsAfterUpdatingImageCache$(events))
    );
  }

  userAllCompletedEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/completed`)).pipe(
      mergeMap(events => this.imageService.eventsAfterUpdatingImageCache$(events))
    );
  }

  userAllRegisteredEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/registered`)).pipe(
      mergeMap(events => this.imageService.eventsAfterUpdatingImageCache$(events))
    );
  }

  register$(eventId: number): Observable<string> {
    return this.http.post<string>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/volunteer`), eventId);
  }

  unregister$(eventId: number): Observable<string> {
    return this.http.get<string>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/unregister/${eventId}`));
  }
}
