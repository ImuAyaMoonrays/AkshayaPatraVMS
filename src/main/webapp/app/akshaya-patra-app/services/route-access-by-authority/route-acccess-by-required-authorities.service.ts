import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from "../auth/account.service";
import { StateStorageService } from "../auth/state-storage.service";


@Injectable({providedIn: 'root'})
export class RouteAcccessByRequiredAuthoritiesService implements CanActivate {
  constructor(private router: Router, private accountService: AccountService, private stateStorageService: StateStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        if (account) {
          const requiredAuthoritiesSet = new Set(route.data['authorities']);
          const possessedAuthoritiesSet = new Set(account.authorities);
          const canActivate = requiredAuthoritiesSet.size === possessedAuthoritiesSet.size &&
            [...requiredAuthoritiesSet].every((requiredAuthority: string) => possessedAuthoritiesSet.has(requiredAuthority));
          if (canActivate) {
            return true;
          }

        }
        this.router.navigate(['/login']);
        return false;

      })
    );
  }
}
