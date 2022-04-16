import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    console.log(value);
    const splitDate = value.split('-');
    console.log(splitDate);
    return `${splitDate[0]}-${splitDate[1]}-${splitDate[2].slice(0, 2)}`;
  }

}
