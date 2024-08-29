import {ABaseDTO} from "../ABaseDTO";

export class VisitorsDTO extends ABaseDTO{
  ip: string;
  agent: string;
  path: string;
  language: string;
  date: string;
  browser: string;
  os: string;
}
