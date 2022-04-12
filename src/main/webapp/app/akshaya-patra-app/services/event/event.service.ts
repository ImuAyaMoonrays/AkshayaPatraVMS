import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { Observable } from "rxjs";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";
import { CreateEventInterface } from "../../interfaces/event/create-event.interface";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly API_PREFIX = '/api'
  private readonly ADMIN_PREFIX = `${this.API_PREFIX}/admin/events`
  private readonly USER_PREFIX = `${this.API_PREFIX}/user/events`

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
  }

  createEvent$(eventCreationPayload: CreateEventInterface, file: File): Observable<any> {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('file', file, file?.name);
    }
    formData.append('eventWithoutImage', new Blob([JSON.stringify(eventCreationPayload)], {
      type: "application/json"
    }));
    return this.http.post(this.applicationConfigService.getEndpointFor(`${this.ADMIN_PREFIX}/createEvent`), formData);
  }

  adminAllFutureEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.ADMIN_PREFIX}/allFuture`));
  }

  adminAllPastEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.ADMIN_PREFIX}/allPast`));
  }

  adminEventById$(id: number): Observable<EventResponseInterface> {
    return this.http.get<EventResponseInterface>(this.applicationConfigService.getEndpointFor(`${this.ADMIN_PREFIX}/${id}`));
  }

  userEventById$(id: number): Observable<EventResponseInterface> {
    return this.http.get<EventResponseInterface>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/${id}`));
  }

  userAllRegisterableEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/registerable`));
  }

  userAllCompletedEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/completed`));
  }

  userAllRegisteredEvents$(): Observable<EventResponseInterface[]> {
    return this.http.get<EventResponseInterface[]>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/registered`));
  }

  register$(eventId: number): Observable<string> {
    return this.http.post<string>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/volunteer`), eventId);
  }

  unregister$(eventId: number): Observable<string> {
    return this.http.get<string>(this.applicationConfigService.getEndpointFor(`${this.USER_PREFIX}/unregister/${eventId}`));
  }
}
