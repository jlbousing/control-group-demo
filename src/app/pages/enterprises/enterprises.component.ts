import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ICompany } from 'src/app/interfaces/ICompanies';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.scss']
})
export class EnterprisesComponent implements OnInit {

  companies: ICompany[] = [];

  constructor(private companieService: CompaniesService) { }

  ngOnInit(): void {
    this.companieService.getCompanies(50,0).subscribe((response: ICompany[]) => this.companies = response);
  }


}
