import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ConciliationService } from 'src/app/services/conciliations/conciliation.service';
//import { IConcilation } from 'src/app/interfaces/IConcilation';
import { IConciliationData } from 'src/app/interfaces/IConcilationData';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { IInquiryCompany } from 'src/app/interfaces/IInquiryCompany';

@Component({
  selector: 'app-company-report',
  templateUrl: './company-report.component.html',
  styleUrls: ['./company-report.component.scss']
})
export class CompanyReportComponent implements OnInit {

  loading: boolean = false;
  company: ICompany | null = null;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  conciliations: IInquiryCompany | null = null;

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


  setCharData(value: any) {

    this.company = <ICompany>value;

    this.conciliationService.getConciliationInquiryByCompany(this.company.id)
      .subscribe((response: IInquiryCompany) => {

        this.conciliations = response;

        let labels: string[] = [];
        let datasets: any[] = [];

        //METAS
        datasets.push({
          data: [],
          labels: ['Meta']
        });

         //METAS PENDIENTES
         datasets.push({
          data: [],
          labels: ["Pendiente por produccion"]
        });

        //SE ITERA PARA OBTENER LOS LABELS
        this.conciliations.suppliersOfCompany.forEach((item: any) => {

          item.asignamentsList.forEach((element: any) => {
            labels.push(element.name);
          });
        });

        //SE ITERA PARA CONSTRUIR LOS DATOS

        this.conciliations.suppliersOfCompany.forEach((item: any) => {

          item.asignamentsList.forEach((element: any) => {

            //SE INSERTA DATOS EN LA META
            datasets[0].data.push(element.record);

            //SE ASIGNA DATOS EN LA META PENDIENTE
            datasets[1].data.push(element.recordStock);
          });


        });

        this.barChartData.labels = labels;
        this.barChartData.datasets = datasets;

        console.log(this.barChartData);

        this.chart?.update();
        this.loading = false;


      },(error: HttpErrorResponse) => {

        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }

}
