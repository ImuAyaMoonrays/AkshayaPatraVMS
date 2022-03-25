import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { Observable } from "rxjs";
import { EventModel } from "../../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly API_PREFIX = '/api/events'

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  createEvent$(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.applicationConfigService.getEndpointFor(`${this.API_PREFIX}/createEvent`), event);
  }

  allEvents$(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.applicationConfigService.getEndpointFor(`${this.API_PREFIX}/all`));
  }

  eventById$(id: number): Observable<EventModel> {
    return this.http.get<EventModel>(this.applicationConfigService.getEndpointFor(`${this.API_PREFIX}/event/${id}`));
  }

  register$(eventId: number): Observable<string> {
    return this.http.post<string>(this.applicationConfigService.getEndpointFor(`${this.API_PREFIX}/volunteer`), eventId);
  }

  unregister$(eventId: number): Observable<string> {
    return this.http.get<string>(this.applicationConfigService.getEndpointFor(`${this.API_PREFIX}/unregister/${eventId}`));
  }
}
