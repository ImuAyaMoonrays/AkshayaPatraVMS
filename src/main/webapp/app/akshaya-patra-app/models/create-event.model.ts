import { PhysicalLocationModel } from "./physical-location.model";
import { Time } from "@angular/common";
import { VirtualLocationModel } from "./virtual-location.model";
import { CauseModel } from "./cause.model";

export class CreateEventModel {
  constructor(
    public eventName: string,
    public description: string,
    public volunteersNeededAmount: number,
    public startDate: Date,
    public endDate: Date,
    public startTime: Time,
    public endTime: Time,
    public contactName: string,
    public contactPhoneNumber: string,
    public contactEmail: string,
    public emailBody: string,
    public physicalLocation: PhysicalLocationModel = null,
    public virtualLocation: VirtualLocationModel = null,
    public causes: CauseModel[] = [],
    public corporateSubgroupIds: number[] =[],
  ) {
  }

  withCauses(causes: CauseModel[]): CreateEventModel {
    this.causes = causes;
    return this;
  }


}
