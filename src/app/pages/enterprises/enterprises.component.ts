import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { IStatus } from 'src/app/interfaces/IStatus';
import { StatusService } from 'src/app/services/status/status.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.scss']
})
export class EnterprisesComponent implements OnInit {

  companies: ICompany[] = [];
  statues: IStatus[] = [];

  form = new FormGroup({
    name: new FormControl<string | null>(''),
    rif: new FormControl<string>('', Validators.required)
  });

  constructor(
    private companieService: CompaniesService,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.companieService.getCompanies(50,0).subscribe((response: ICompany[]) => this.companies = response);
    this.statusService.getStatues(0,50,0).subscribe((response: IStatus[]) => this.statues = response);
  }

  findCompany() {

    if(this.form.value.rif){

      let name: string | null = this.form.value.name ? this.form.value.name : null;
      let rif: string = this.form.value.rif;

      this.companieService.findCompany(name,rif)
        .subscribe((response: ICompany[]) => {
          console.log("buscando empresas");
          console.log(response)
          this.companies = response;
        })
    }
  }


}
