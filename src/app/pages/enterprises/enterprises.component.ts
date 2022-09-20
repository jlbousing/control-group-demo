import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { IStatus } from 'src/app/interfaces/IStatus';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.scss']
})
export class EnterprisesComponent implements OnInit {

  companies: ICompany[] = [];
  statues: IStatus[] = [];

  loading: boolean = true;

  constructor(
    private companieService: CompaniesService,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.companieService.getCompanies(50,0).subscribe((response: ICompany[]) => {
      this.companies = response;
      this.loading = false;
    });
    this.statusService.getStatues(0,50,0).subscribe((response: IStatus[]) => {
      this.statues = response;
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

    this.companieService.getCompanies(50,0).subscribe((response: ICompany[]) => {
      this.companies = response;
      this.loading = false;
    });

  }

}
