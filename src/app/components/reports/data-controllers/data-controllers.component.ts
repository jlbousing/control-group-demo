import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { IInquirySupplierData } from 'src/app/interfaces/InquirySupplierData';

@Component({
  selector: 'data-controllers',
  templateUrl: './data-controllers.component.html',
  styleUrls: ['./data-controllers.component.scss']
})
export class DataControllersComponent implements OnInit {

  @Output() inquiryData = new EventEmitter<IInquirySupplierData>();

  companies: ICompany[] = [];
  suppliers: ISupplier[] = [];

  company: ICompany | null = null;
  supplier: ISupplier | null = null;
  startDate: string | null = "";
  endDate: string | null = "";

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

    if(this.supplier
      && this.startDate && this.endDate
      && this.startDate !== "" && this.endDate !== "") {

        console.log("bandera 1 ",this.formatDate(this.startDate))
        console.log("bandera 2 ",this.formatDate(this.endDate))

        const data: IInquirySupplierData = {
          supplierId: this.supplier.id,
          startDate: this.formatDate(this.startDate),
          endDate: this.formatDate(this.endDate)
        };

        this.inquiryData.emit(data);
      }

  }

  setSupplier(value: any) {
    this.supplier = <ISupplier>value;

    if(this.supplier
      && this.startDate && this.endDate
      && this.startDate !== "" && this.endDate !== "") {

        console.log("bandera 1 ",this.formatDate(this.startDate))
        console.log("bandera 2 ",this.formatDate(this.endDate))

        const data: IInquirySupplierData = {
          supplierId: this.supplier.id,
          startDate: this.formatDate(this.startDate),
          endDate: this.formatDate(this.endDate)
        };

        this.inquiryData.emit(data);
      }

  }

  formatDate(date: string) {
    let positions = date.split("-");
    return positions[1] + "-" + positions[2] + "-" + positions[0];
  }

  setStartDate(value: any) {
    let valueDate: string = <string>value;
    this.startDate = valueDate;

    if(this.supplier
      && this.startDate && this.endDate
      && this.startDate !== "" && this.endDate !== "") {

        console.log("bandera 1 ",this.formatDate(this.startDate))
        console.log("bandera 2 ",this.formatDate(this.endDate))
        const data: IInquirySupplierData = {
          supplierId: this.supplier.id,
          startDate: this.formatDate(this.startDate),
          endDate: this.formatDate(this.endDate)
        };

        this.inquiryData.emit(data);
      }
  }

  setEndDate(value: any) {
    let valueDate: string = <string>value;
    this.endDate = valueDate;

    if(this.supplier
      && this.startDate && this.endDate
      && this.startDate !== "" && this.endDate !== "") {

        console.log("bandera 1 ",this.formatDate(this.startDate))
        console.log("bandera 2 ",this.formatDate(this.endDate))

        const data: IInquirySupplierData = {
          supplierId: this.supplier.id,
          startDate: this.formatDate(this.startDate),
          endDate: this.formatDate(this.endDate)
        };

        this.inquiryData.emit(data);
      }
  }

}
