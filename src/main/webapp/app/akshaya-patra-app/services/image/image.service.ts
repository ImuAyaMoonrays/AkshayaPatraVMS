import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { Observable } from "rxjs";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly API_PREFIX = '/api/images'

  constructor(private http: HttpClient,
              private applicationConfigService: ApplicationConfigService,
              private sanitizer: DomSanitizer) {
  }

  imageById$(id: string): Observable<SafeUrl> {
    return this.http.get(this.applicationConfigService.getEndpointFor(`${this.API_PREFIX}/${id}`), {responseType: 'blob'}).pipe(
      //TODO: do more research to make sure this is 100% safe
      map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)))
    )
  }

}
