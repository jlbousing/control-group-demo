import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { ISupplier } from 'src/app/interfaces/ISupplier';

@Component({
  selector: 'data-controllers',
  templateUrl: './data-controllers.component.html',
  styleUrls: ['./data-controllers.component.scss']
})
export class DataControllersComponent implements OnInit {


  companies: ICompany[] = [];
  suppliers: ISupplier[] = [];

  company: ICompany | null = null;
  supplier: ISupplier | null = null;

  loading: boolean = true;


  constructor(
    private companyService: CompaniesService,
    private suppliersService: SuppliersService
  ) { }

  ngOnInit(): void {

    this.companyService.getCompanies(50,0)
      .subscribe((response: ICompany[]) => {
        this.companies = response;
        this.loading = false;
      });
  }

  setCompany(value: any) {
    this.company = <ICompany>value;
    this.suppliers = this.company.suppliersOfCompany;
  }

  setSupplier(value: any) {
    this.supplier = <ISupplier>value;
  }

}
