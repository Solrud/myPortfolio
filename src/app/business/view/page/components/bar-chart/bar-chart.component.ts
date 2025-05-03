import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges{
  @Input('type')
  type: any;

  @Input('options')
  options: any;

  @Input('data')
  data: any;

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log('chart update')
      this.chart?.update();
      this.cdr.detectChanges();
    }
}
