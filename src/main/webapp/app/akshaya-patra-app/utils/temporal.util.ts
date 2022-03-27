import { Time } from "@angular/common";

export class TemporalUtil {

  static dateFromDatePicker(datePickerValue: { year: number, month: number, day: number }): Date {
    return new Date(datePickerValue.year, datePickerValue.month - 1, datePickerValue.day);
  }

  static timeFromTimePicker(timePickerValue: { hour: number, minute: number, second: number }): Time {
    return {hours: timePickerValue.hour, minutes: timePickerValue.minute};
  }

}
