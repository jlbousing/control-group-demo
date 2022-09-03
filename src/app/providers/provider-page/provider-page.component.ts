import { Component, OnInit } from '@angular/core';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { ICompany } from 'src/app/interfaces/ICompanies'
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.scss']
})
export class ProviderPageComponent implements OnInit {

  suppliers: ISupplier[] = [];
  company: ICompany | null = null;
  rif: string = '';

  constructor(
    private route: ActivatedRoute,
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.rif = params['rif'];
      this.companyService.findCompany(null,this.rif).subscribe((response: ICompany[]) => {
        this.company = response[0];
        this.suppliers = response[0].suppliersOfCompany;
      })
   });
  }

}
