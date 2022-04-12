import { AbstractEventInterface } from "./abstract-event-interface";
import { ImageResponseInterface } from "../image-response.interface";
import { Account } from "../../services/auth/account.model";
import { CauseInterface } from "../cause.interface";

export interface EventResponseInterface extends AbstractEventInterface {
  id: string;
  currentAmountOfVolunteers: number;
  image?: ImageResponseInterface;
  volunteers?: Account[];
  causes?: CauseInterface[]
  registered?: boolean;
}
