import {Component, Input} from '@angular/core';
import {ChartConfiguration, ChartType} from "chart.js";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  @Input('type')
  type: ChartType;

  @Input('labels')
  labels: string[];

  @Input('options')
  options: ChartConfiguration<any>['options'];

  @Input('datasets')
  datasets: ChartConfiguration<any>['data']['datasets'];

}
