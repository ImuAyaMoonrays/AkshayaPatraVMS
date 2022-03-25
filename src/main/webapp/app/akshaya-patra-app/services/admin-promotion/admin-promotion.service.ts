import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminPromotionService {

  private readonly API_PREFIX = 'api/admin/users'

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  promoteToAdmin$(accountId: number): Observable<any> {
    return this.http.get(this.applicationConfigService.getEndpointFor(`${this.API_PREFIX}/addAdminAuthority/${accountId}`));
  }

  demoteToNormalUser$(accountId: number): Observable<any> {
    return this.http.get(this.applicationConfigService.getEndpointFor(`${this.API_PREFIX}/removeAdminAuthority/${accountId}`));
  }
}
