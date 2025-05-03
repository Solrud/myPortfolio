import { Component } from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from "chart.js";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  public barChartType: ChartType = 'bar';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        stacked: true
      },
      x: {
        stacked: true
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: ['Категория 1', 'Категория 2', 'Категория 3'],
    datasets: [
      {
        data: [20, 30, 15],
        label: 'Часть 1',
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)'
      },
      {
        data: [30, 20, 40],
        label: 'Часть 2',
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)'
      }
    ]
  };
}
