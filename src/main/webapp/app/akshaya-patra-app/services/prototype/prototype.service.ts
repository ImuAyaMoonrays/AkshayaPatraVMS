import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrototypeService implements OnInit {
  jaipurFoodDriveEventStatus = { isRegistered: false, numberRegistered: 11 };
  jaipurFoodDriveEventStatus$ = new BehaviorSubject<{ isRegistered: boolean; numberRegistered: number }>(this.jaipurFoodDriveEventStatus);

  isAdminAccount$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnInit() {
    this.emitJaipurFoodDriveEventStatus();
  }

  registerForFoodDrive(): void {
    this.jaipurFoodDriveEventStatus.isRegistered = true;
    this.jaipurFoodDriveEventStatus.numberRegistered += 1;
    this.emitJaipurFoodDriveEventStatus();
  }

  unregisterForFoodDrive(): void {
    this.jaipurFoodDriveEventStatus.isRegistered = false;
    this.jaipurFoodDriveEventStatus.numberRegistered -= 1;
    this.emitJaipurFoodDriveEventStatus();
  }

  private emitJaipurFoodDriveEventStatus(): void {
    this.jaipurFoodDriveEventStatus$.next(this.jaipurFoodDriveEventStatus);
  }

  adminLogin(): void {
    this.isAdminAccount$.next(true);
  }

  logout(): void {
    this.isAdminAccount$.next(false);
  }
}
