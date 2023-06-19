import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const splitDate = value.split('-');
    return `${splitDate[0]}-${splitDate[1]}-${splitDate[2].slice(0, 2)}`;
  }

}
