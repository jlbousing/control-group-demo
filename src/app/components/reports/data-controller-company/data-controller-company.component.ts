import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'data-controller-company',
  templateUrl: './data-controller-company.component.html',
  styleUrls: ['./data-controller-company.component.scss']
})
export class DataControllerCompanyComponent implements OnInit {

  @Output() inquiryData = new EventEmitter<ICompany>();

  loading: boolean = true;

  companies: ICompany[] = [];
  company: ICompany | null = null;

  constructor(
    private companyService: CompaniesService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.companyService.getCompanies(50,0)
      .subscribe((response: ICompany[]) => {

        this.companies = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }

  setCompany(value: any) {

    this.company = <ICompany>value;

    this.inquiryData.emit(this.company);
  }

}
