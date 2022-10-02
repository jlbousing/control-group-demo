import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ConciliationService } from 'src/app/services/conciliations/conciliation.service';
import { IInquirySupplierData } from 'src/app/interfaces/InquirySupplierData';
//import { IConcilation } from 'src/app/interfaces/IConcilation';
import { IConciliationData } from 'src/app/interfaces/IConcilationData';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'app-dispatch-report',
  templateUrl: './dispatch-report.component.html',
  styleUrls: ['./dispatch-report.component.scss']
})
export class DispatchReportComponent implements OnInit {

  loading: boolean = false;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  conciliations: IConciliationData[] | null = null;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  constructor(
    private conciliationService: ConciliationService,
    private errorHandler: ErrorHandlerService
  ) {

  }

  ngOnInit(): void {

  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }

  setCharData(value: any) {

    this.conciliations = [];
    this.loading = true;
    const data: IInquirySupplierData = <IInquirySupplierData>value;
    console.log("mostrando data ",data);
    this.conciliationService
      .getConciliationInquiryBySupplier(50,0,data.supplierId,data.startDate,data.endDate)
        .subscribe((response: IConciliationData[]) => {

          this.conciliations = response;

          let labels = this.conciliations.map((item: IConciliationData) => {
            return item.asignamentData.name
          });

          let datasets: any[] = [];

          datasets.push({
            data: [],
            labels: ['Despacho']
          });

          this.conciliations.forEach((item: IConciliationData) => {
            datasets[0].data.push(item.dispatchQuantity);
          });

          this.barChartData.labels = labels;
          this.barChartData.datasets = datasets;

          console.log(this.barChartData);

          this.chart?.update();
          this.loading = false;

        });
  }
}
