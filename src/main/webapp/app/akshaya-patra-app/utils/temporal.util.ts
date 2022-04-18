import { Time } from "@angular/common";
import { DatePickerDateInterface } from "../interfaces/date-picker-date.interface";

export class TemporalUtil {

  static dateFromDatePicker(datePickerValue: DatePickerDateInterface): Date {
    return new Date(datePickerValue.year, datePickerValue.month - 1, datePickerValue.day + 1);
  }

  static timeFromTimePicker(timePickerValue: { hour: number, minute: number, second: number }): Time {
    return {hours: timePickerValue.hour, minutes: timePickerValue.minute};
  }

  static serverDateToClientDate(serverDate: string): Date {
    return new Date(serverDate);
  }

  static datePickerDateFromEventDateString(eventDate: string): DatePickerDateInterface {
    const splitDate = eventDate.split('-');
    return {
      year: Number(splitDate[0]),
      month: Number(splitDate[1]),
      day: Number(splitDate[2].slice(0, 2))
    }
  }

  static isSecondDateLarger(eventDate1: DatePickerDateInterface, eventDate2: DatePickerDateInterface): boolean {
    return eventDate2.year > eventDate1.year ||
      eventDate2.month > eventDate1.month ||
      eventDate2.day > eventDate1.day;
  }

  static areDatesEqual(eventDate1: DatePickerDateInterface, eventDate2: DatePickerDateInterface): boolean {
    return eventDate2.year === eventDate1.year &&
      eventDate2.month === eventDate1.month &&
      eventDate2.day === eventDate1.day;
  }
}
