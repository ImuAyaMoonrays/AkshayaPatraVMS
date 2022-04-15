import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { Observable, of } from "rxjs";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { map, tap } from "rxjs/operators";

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

}
