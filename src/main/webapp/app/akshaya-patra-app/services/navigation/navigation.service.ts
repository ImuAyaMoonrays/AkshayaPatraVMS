import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private store: Store, private router: Router) { }

  navigateToSingleEventView(eventId: string): void {
    this.router.navigate([`${this.router.url}/${eventId}`]);
  }
}
