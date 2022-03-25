import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicationConfigService } from "../application-config/application-config.service";
import { Observable } from "rxjs";
import { Account } from "../auth/account.model";
import { AuthoiritiesEnum } from "../../enums/authoirities.enum";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {
  }

  allUsers$(): Observable<Account[]> {
    return this.http.get<Account[]>(this.applicationConfigService.getEndpointFor(`api/admin/users`));
  }

  allNormalUsers$(): Observable<Account[]> {
    return this.allUsers$().pipe(
      map(accounts => accounts.filter(account => !account.authorities.includes(AuthoiritiesEnum.ROLE_ADMIN)))
    );
  }

}
