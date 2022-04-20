import { Pipe, PipeTransform } from '@angular/core';
import { CauseInterface } from "../../interfaces/cause.interface";

@Pipe({
  name: 'causes'
})
export class CausesPipe implements PipeTransform {

  transform(causes: CauseInterface[], ...args: unknown[]): string {
    console.log(causes)
    if (!causes || causes.length === 0) {
      return 'None';
    } else {
      let causeString = '';
      const lastCause = causes[causes.length-1].causeName;
      causes.forEach(cause => {
        causeString += cause.causeName;
        if (cause.causeName !== lastCause) {
          causeString += ', ';
        }
      });
      return causeString
    }
  }

}
