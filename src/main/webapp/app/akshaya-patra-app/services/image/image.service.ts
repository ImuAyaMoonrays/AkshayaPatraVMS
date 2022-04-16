import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { forkJoin, Observable, of } from "rxjs";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { map, tap } from "rxjs/operators";
import { EventResponseInterface } from "../../interfaces/event/event-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly API_PREFIX = '/api/images'

  constructor(private http: HttpClient,
              private applicationConfigService: ApplicationConfigService,
              private sanitizer: DomSanitizer) {
  }

  imageCache = {};

  imageById$(id: string): Observable<SafeUrl> {
    if (this.imageCache[id]) {
      return of(this.imageCache[id]);
    } else {
      return this.http.get(this.applicationConfigService.getEndpointFor(`${this.API_PREFIX}/${id}`), {responseType: 'blob'}).pipe(
        //TODO: do more research to make sure this is 100% safe
        map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))),
        tap((safeUrl) => {
          this.imageCache[id] = safeUrl;
        })
      );
    }
  }

  eventsAfterUpdatingImageCache$(events: EventResponseInterface[]): Observable<EventResponseInterface[]> {
    if (events.every(event => !event.image)) {
      return of(events);
    } else {
      return forkJoin(events.filter(event => event.image).map(event => this.imageById$(event.image.id))).pipe(
        map(() => events)
      );
    }
  }

  eventAfterUpdatingImageCache$(event: EventResponseInterface): Observable<EventResponseInterface> {
    if (event.image) {
      return this.imageById$(event.image.id).pipe(
        map(() => event)
      )
    } else {
      return of(event);
    }
  }

  clearImageFromCache(imageId: string): void {
    delete this.imageCache[imageId];
  }

  clearImageCache(): void {
    this.imageCache = {};
  }

}
