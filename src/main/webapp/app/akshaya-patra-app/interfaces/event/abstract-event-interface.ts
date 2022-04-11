import { Time } from "@angular/common";
import { PhysicalLocationModel } from "../../models/physical-location.model";
import { VirtualLocationModel } from "../../models/virtual-location.model";

export interface AbstractEventInterface {
  emailFilters?: string[];
  eventName: string,
  physicalLocation?: PhysicalLocationModel;
  virtualLocation?: VirtualLocationModel;
  description: string,
  volunteersNeededAmount: number,
  startDate: Date | string,
  endDate: Date | string,
  startTime: Time,
  endTime: Time,
  contactName: string,
  contactPhoneNumber: string,
  contactEmail: string,
  emailBody?: string,
}
