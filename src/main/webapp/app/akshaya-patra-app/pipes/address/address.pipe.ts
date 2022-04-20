import { Pipe, PipeTransform } from '@angular/core';
import { PhysicalLocationInterface } from "../../interfaces/physical-location.interface";

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(physicalLocation: PhysicalLocationInterface, ...args: unknown[]): unknown {
    if (physicalLocation.address === '' &&
      physicalLocation.state === '' &&
      physicalLocation.city === '' &&
      physicalLocation.locality === '' &&
      physicalLocation.region === '' &&
      physicalLocation.country === ''
    ) {
      return 'No Address'
    } else {
      return `${physicalLocation.address ? physicalLocation.address + ',' : ''}
      ${physicalLocation.state ? physicalLocation.state + ',' : ''}
      ${physicalLocation.city ? physicalLocation.city + ',' : ''}
      ${physicalLocation.locality ? physicalLocation.locality + ',' : ''}
      ${physicalLocation.region ? physicalLocation.region + ',' : ''}
      ${physicalLocation.country ? physicalLocation.country : ''}`
    }
  }
}
