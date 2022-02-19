import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { EventModel } from '../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  createEventForm = this.fb.group({
    cause: [null, Validators.required],
    volunteersNeeded: [null, [Validators.pattern('^[0-9]*$'), Validators.required]],
    location: [null, Validators.required],
    date: [
      null,
      [
        Validators.pattern(
          '^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$'
        ),
        Validators.required,
      ],
    ],
  });

  constructor(private fb: FormBuilder, private router: Router, private prototypeService: PrototypeService) {}

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
