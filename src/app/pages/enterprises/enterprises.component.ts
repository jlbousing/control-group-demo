import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { IStatus } from 'src/app/interfaces/IStatus';
import { StatusService } from 'src/app/services/status/status.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.scss']
})
export class EnterprisesComponent implements OnInit {

  companies: ICompany[] = [];
  statues: IStatus[] = [];

  loading: boolean = true;

  offset: number = 0;

  constructor(
    private companieService: CompaniesService,
    private statusService: StatusService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.companieService.getCompanies(10,this.offset).subscribe((response: ICompany[]) => {
      this.companies = response;
      this.loading = false;
    },(error: HttpErrorResponse) => {

      this.errorHandler.handleError(error);
      this.loading = false;
    });
    this.statusService.getStatues(1,10,this.offset).subscribe((response: IStatus[]) => {
      this.statues = response;
      this.loading = false;
    },(error: HttpErrorResponse) => {

      this.errorHandler.handleError(error);
      this.loading = false;
    });
  }

  setLoading(value: any) {
    this.loading = <boolean>value;
  }

  setCompanies(value: any) {
    this.companies = <ICompany[]>value;
  }

  resetCompanies() {

    this.loading = true;
    this.offset = 0;

    this.companieService.getCompanies(10,this.offset).subscribe((response: ICompany[]) => {
      this.companies = response;
      this.loading = false;
    },(error: HttpErrorResponse) => {

      this.errorHandler.handleError(error);
      this.loading = false;
    });

  }

  changePagination(value: any) {

    this.offset = <number>value;

    this.companieService.getCompanies(10,this.offset).subscribe((response: ICompany[]) => {
      this.companies = response;
      this.loading = false;
    },(error: HttpErrorResponse) => {

      this.errorHandler.handleError(error);
    });
    this.statusService.getStatues(1,10,this.offset).subscribe((response: IStatus[]) => {
      this.statues = response;
      this.loading = false;
    },(error: HttpErrorResponse) => {

      this.errorHandler.handleError(error);
      this.loading = false;
    });

  }

}
