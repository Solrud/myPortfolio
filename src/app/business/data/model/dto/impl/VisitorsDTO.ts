import {ABaseDTO} from "../ABaseDTO";

//ToDo переименовать VisitorDTO
export class VisitorsDTO extends ABaseDTO{
  ip: string = '';
  agent: string;
  path: string;
  language: string;
  date: string;
  browser: string;
  os: string;
}
