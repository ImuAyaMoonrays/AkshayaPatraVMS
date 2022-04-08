import { AbstractEventInterface } from "./abstract-event-interface";
import { ImageResponseInterface } from "../image-response.interface";
import { Account } from "../../services/auth/account.model";

export interface EventResponseInterface extends AbstractEventInterface {
  image: ImageResponseInterface;
  volunteers: Account[];
}
