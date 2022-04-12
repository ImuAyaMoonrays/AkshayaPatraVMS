import { AbstractEventInterface } from "./abstract-event-interface";

export interface CreateEventInterface extends AbstractEventInterface {
  newCauses: string[];
  existingCauseIDs: number[];
}
