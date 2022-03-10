import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { Observable } from "rxjs";
import { CreateEventModel } from "../../models/create-event.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  createEvent(event: CreateEventModel): Observable<CreateEventModel> {
    return this.http.post<CreateEventModel>(this.applicationConfigService.getEndpointFor('/api/events/createEvent'), event);
  }
}
