import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrototypeService } from '../../services/prototype/prototype.service';
import { EventModel } from '../../models/event.model';
import { Router } from '@angular/router';
import { map, mergeMap, tap } from "rxjs/operators";
import { BehaviorSubject, merge, Observable, of } from "rxjs";
import { EventService } from "../../services/event/event.service";
import { CreateEventModel } from "../../models/create-event.model";
import { date } from "ng2-validation/dist/date";
import { Time } from "@angular/common";
import { PhysicalLocationModel } from "../../models/physical-location.model";
import { VirtualLocationModel } from "../../models/virtual-location.model";
import { CauseModel } from "../../models/cause.model";
import { CauseService } from "../../services/cause/cause.service";

@Component({
  selector: 'jhi-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {

  causes: { name: string, id: number }[] = [];
  selectedCauses: string[] = [];
  newCause: FormControl = new FormControl('');


  createEventForm = this.fb.group({
    eventName: ['', Validators.required],
    description: [''],
    volunteersNeededAmount: [null, [Validators.pattern('^[0-9]*$'), Validators.required]],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    startTime: [null, Validators.required],
    endTime: [null, Validators.required],
    contactName: [''],
    contactPhoneNumber: [''],
    contactEmail: ['', Validators.email],
    emailBody: [''],
  });

  phyiscalLocationForm = this.fb.group({
    address: [''],
    state: [''],
    city: [''],
    locality: [''],
    region: [''],
    country: [''],
  });

  virtualLocationForm = this.fb.group({
    url: ['', Validators.required],
    passcode: [''],
  });


  locationTypeForm = this.fb.group({
    locationType: ['physical']
  })

  datePickersettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }

  showPhysicalLocationForm$: Observable<boolean>;


  constructor(private fb: FormBuilder,
              private router: Router,
              private eventService: EventService,
              private causeService: CauseService) {
  }

  ngOnInit(): void {
    this.causeService.allCauses().subscribe((causes) => {
      causes.forEach(cause => this.causes = this.causes.concat(cause))
    })
    this.showPhysicalLocationForm$ =
      merge(
        this.locationTypeForm.get('locationType').valueChanges.pipe(
          mergeMap(locationType => of(locationType === 'physical')),
        ),
        of(true)
      )
  }

  addCause(): void {
    const newCauseValue = (this.newCause.value as string).toUpperCase();
    if (newCauseValue !== '' && !this.causes.map(cause => cause.name).includes(newCauseValue)) {
      const newCause = {name: newCauseValue, id: null};

      this.causes = this.causes.concat(newCause);
      this.selectedCauses = this.selectedCauses.concat(newCauseValue);
    }
    this.newCause.setValue('');
  }

  createEvent(): void {
    const createEventForm = this.createEventForm;
    const physicalLocationForm = this.phyiscalLocationForm;
    const virtualLocationForm = this.virtualLocationForm;

    if (createEventForm.valid && this.physicalLocationSelectedAndFormValid(physicalLocationForm) || this.virtualLocationSelectedAndFormValid(virtualLocationForm)) {
      const event = new CreateEventModel(
        createEventForm.get('eventName').value,
        createEventForm.get('description').value,
        Number(createEventForm.get('volunteersNeededAmount').value),
        this.dateFromDatePicker(createEventForm.get('startDate').value),
        this.dateFromDatePicker(createEventForm.get('endDate').value),
        this.timeFromTimePicker(createEventForm.get('startTime').value),
        this.timeFromTimePicker(createEventForm.get('endTime').value),
        createEventForm.get('contactName').value,
        createEventForm.get('contactPhoneNumber').value,
        createEventForm.get('contactEmail').value,
        createEventForm.get('emailBody').value,
      ).withCauses(this.causes.map(cause => new CauseModel(cause.id, cause.name)));

      if (this.isPhysicalLocationTypeSelected()) {
        event.physicalLocation = new PhysicalLocationModel(
          physicalLocationForm.get('address').value,
          physicalLocationForm.get('state').value,
          physicalLocationForm.get('city').value,
          physicalLocationForm.get('locality').value,
          physicalLocationForm.get('region').value,
          physicalLocationForm.get('country').value,
        );
      } else {
        event.virtualLocation = new VirtualLocationModel(
          virtualLocationForm.get('url').value,
          virtualLocationForm.get('passcode').value,
        )
      }

      this.eventService.createEvent(event).subscribe(console.log);
    }
  }

  private virtualLocationSelectedAndFormValid(virtualLocationForm: FormGroup) {
    return !this.isPhysicalLocationTypeSelected() && virtualLocationForm.valid;
  }

  private physicalLocationSelectedAndFormValid(physicalLocationForm: FormGroup) {
    return this.isPhysicalLocationTypeSelected() && physicalLocationForm.valid;
  }

  private isPhysicalLocationTypeSelected(): boolean {
    return this.locationTypeForm.get('locationType').value === 'physical';
  }

  private dateFromDatePicker(datePickerValue: { year: number, month: number, day: number }): Date {
    return new Date(datePickerValue.year, datePickerValue.month - 1, datePickerValue.day - 1);
  }

  private timeFromTimePicker(timePickerValue: { hour: number, minute: number, second: number }): Time {
    return {hours: timePickerValue.hour, minutes: timePickerValue.minute};
  }


}
