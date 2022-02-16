import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  readonly signUpText: string = 'Sing Up';
  buttonText: string = this.signUpText;
  volunteerAmount: number = 11;
  registered: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  registrationButtonClick() {
    if (this.buttonText === this.signUpText) {
      this.signUpForEvent();
    } else {
      this.unregisterForEvent();
    }
  }

  signUpForEvent(): void {
    this.buttonText = 'Unregister';
    this.volunteerAmount += 1;
    this.registered = true;
  }

  unregisterForEvent(): void {
    this.buttonText = this.signUpText;
    this.volunteerAmount -= 1;
    this.registered = false;
  }
}
