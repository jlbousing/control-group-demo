import { Component, OnInit, Input ,ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IConciliationData } from 'src/app/interfaces/IConcilationData';

@Component({
  selector: 'piechart-assignaments',
  templateUrl: './piechart-assignaments.component.html',
  styleUrls: ['./piechart-assignaments.component.scss']
})
export class PiechartAssignamentsComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input("meta") meta: number = 0;
  @Input("pending") pending: number = 0;
  @Input("name") name: string = "";

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: []
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  constructor() { }

  ngOnInit(): void {

    console.log("meta ",this.meta);
    console.log("peding",this.pending);

    this.pieChartData = {
      labels: [ [ 'Meta' ], 'Pendiente por produccion' ],
      datasets: [ {
        data: [ this.meta, this.pending ]
      } ]
    };
  }

}
