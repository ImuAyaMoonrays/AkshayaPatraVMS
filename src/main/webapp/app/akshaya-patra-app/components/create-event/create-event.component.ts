import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { EventModel } from '../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  selectedCauses;
  causes = [
    {
      name: 'Hunger',
    },
    {
      name: 'education',
    },
  ];

  newCause: FormControl = new FormControl('');

  createEventForm = this.fb.group({
    eventName: ['', Validators.required],
    location: this.fb.group({
      address: [''],
      state: [''],
      city: [''],
      locality: [''],
      region: [''],
      country: [''],
    }),
    description: [''],
    volunteersNeededAmount: [null, [Validators.pattern('^[0-9]*$'), Validators.required]],
    startDateAndTime: [null],
    endDateAndTime: [null],
    contactName: [''],
    contactPhoneNumber: [''],
    contactEmail: [Validators.email],
    emailBody: [''],
  });

  constructor(private fb: FormBuilder, private router: Router, private prototypeService: PrototypeService) {}

  logModel(): void {
    console.log('here');
    console.log(this.selectedCauses);
  }

  addCause(): void {
    const newCauseValue = this.newCause.value;
    if (newCauseValue !== '' && !this.causes.map(cause => cause.name).includes(newCauseValue)) {
      const newCause = { name: newCauseValue };

      this.causes = this.causes.concat(newCause);
      this.selectedCauses = this.selectedCauses.concat(newCauseValue);
    }
    this.newCause.setValue('');
  }

  ngOnInit(): void {}

  createEvent(): void {
    if (this.createEventForm.valid) {
      this.prototypeService.addEvent(
        new EventModel(
          this.prototypeService.maxEventId() + 1,
          Number(this.createEventForm.get('volunteersNeeded').value),
          0,
          this.createEventForm.get('cause').value,
          this.createEventForm.get('location').value,
          this.extractedDate(this.createEventForm.get('date').value),
          false
        )
      );
      this.router.navigate(['/home/events']);
    }
  }

  private extractedDate(date: string): Date {
    const day = Number(date.slice(0, 2));
    const month = Number(date.slice(3, 5)) - 1;
    const year = Number(date.slice(6, 10));
    return new Date(year, month, day);
  }
}
