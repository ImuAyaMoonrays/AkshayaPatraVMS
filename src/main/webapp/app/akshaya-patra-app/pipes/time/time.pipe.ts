import { Pipe, PipeTransform } from '@angular/core';
import { Time } from "@angular/common";

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: Time, ...args: unknown[]): string {
    return `${time.hours}:${time.minutes < 10 ? '0' : ''}${time.minutes}`;
  }

}
