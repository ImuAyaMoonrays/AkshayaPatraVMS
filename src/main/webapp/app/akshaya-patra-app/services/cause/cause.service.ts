import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { CreateEventModel } from "../../models/create-event.model";
import { Observable } from "rxjs";
import { CauseModel } from "../../models/cause.model";

@Injectable({
  providedIn: 'root'
})
export class CauseService {

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  allCauses(): Observable<CauseModel[]> {
    return this.http.get<CauseModel[]>(this.applicationConfigService.getEndpointFor('/api/causes/getAll'));
  }
}
