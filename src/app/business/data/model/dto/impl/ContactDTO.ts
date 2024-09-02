import {ABaseDTO} from "../ABaseDTO";

export class ContactDTO extends ABaseDTO{
  name: string;
  email: string;
  question: string;
  comment: string;
  date: string;
  ip: string;
  device: string;
}
