import { PhysicalLocationModel } from "./physical-location.model";
import { Time } from "@angular/common";
import { VirtualLocationModel } from "./virtual-location.model";
import { CauseModel } from "./cause.model";
import { Account } from "../services/auth/account.model";

export class EventModel {
  constructor(
    public eventName: string,
    public description: string,
    public volunteersNeededAmount: number,
    public startDate: Date | string,
    public endDate: Date | string,
    public startTime: Time,
    public endTime: Time,
    public contactName: string,
    public contactPhoneNumber: string,
    public contactEmail: string,
    public emailBody: string,
    public physicalLocation: PhysicalLocationModel = null,
    public virtualLocation: VirtualLocationModel = null,
    public causes: CauseModel[] = [],
    public emailFilters: string[] = [],
    public corporateSubgroupIds: number[] =[],
    public id: string = null,
    public volunteers: Account[] = [],
    public file: File = null
  ) {
  }

  withCauses(causes: CauseModel[]): EventModel {
    this.causes = causes;
    return this;
  }

  withEmailFilters(emailFilters: string[]): EventModel {
    this.emailFilters = emailFilters;
    return this;
  }

  withFile(file: File): EventModel {
    this.file = file;
    return this;
  }


}
