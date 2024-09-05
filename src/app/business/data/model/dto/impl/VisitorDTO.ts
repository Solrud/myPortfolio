import {ABaseDTO} from "../ABaseDTO";

export class VisitorDTO extends ABaseDTO{
  ip: string = '';
  agent: string;
  path: string;
  language: string;
  date: any;
  ip_description: string;
  browser: string;
  browser_version: string;
  os: string;
  os_version: string;
  device: string;
  device_type: string;
  orientation: string;
  screen_width: number;
  screen_height: number;
}
