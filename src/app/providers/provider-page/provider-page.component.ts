import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { ICompany } from 'src/app/interfaces/ICompanies'
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.scss']
})
export class ProviderPageComponent implements OnInit {

  suppliers: ISupplier[] = [];
  company: ICompany | null = null;
  rif: string = '';

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompaniesService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.rif = params['rif'];
      this.companyService.findCompany(null,this.rif).subscribe((response: ICompany[]) => {
        this.company = response[0];
        this.suppliers = response[0].suppliersOfCompany;

        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
      })
   });
  }

}
