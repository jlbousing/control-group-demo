import { Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { IStatus } from 'src/app/interfaces/IStatus';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'search-enterprise',
  templateUrl: './search-enterprise.component.html',
  styleUrls: ['./search-enterprise.component.scss']
})
export class SearchEnterpriseComponent implements OnInit {

  @Input("statues") statues: IStatus[] = [];

  @Output() searchedCompanies = new EventEmitter<ICompany[]>();
  @Output() loading = new EventEmitter<boolean>();
  @Output() resetCompanies = new EventEmitter<boolean>();

  form = new FormGroup({
    name: new FormControl<string | null>('',[Validators.maxLength(30),Validators.minLength(3)]),
    rif: new FormControl<string>('', Validators.required)
  });

  companies: ICompany[] = [];

  constructor(
    private companieService: CompaniesService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  findCompany() {

    this.loading.emit(true);

    if(this.form.value.rif){

      let name: string | null = this.form.value.name ? this.form.value.name : null;
      let rif: string = this.form.value.rif;

      this.companieService.findCompany(name,rif)
        .subscribe((response: ICompany[]) => {
          console.log("buscando empresas");
          console.log(response)
          this.companies = response;
          this.loading.emit(false);
          this.searchedCompanies.emit(this.companies);
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading.emit(false);
        });
    }
  }

  emptyInputs(){

    if(this.form.value.name === ""
       && this.form.value.rif === "") {
        this.resetCompanies.emit(true);
       }
  }

}
