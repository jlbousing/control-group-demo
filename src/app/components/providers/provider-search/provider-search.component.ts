import { Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { IStatus } from 'src/app/interfaces/IStatus';

@Component({
  selector: 'app-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.scss']
})
export class ProviderSearchComponent implements OnInit {

  @Input("statues") statues: IStatus[] = [];

  @Output() searchedCompanies = new EventEmitter<ISupplier[]>();
  @Output() loading = new EventEmitter<boolean>();
  @Output() resetCompanies = new EventEmitter<boolean>();

  form = new FormGroup({
    name: new FormControl<string | null>(''),
    rif: new FormControl<string>('', Validators.required)
  });

  constructor(
    private supplierService: SuppliersService
  ) { }

  ngOnInit(): void {
  }

  findCompany() {

    this.loading.emit(true);

    if(this.form.value.rif){

      let name: string | null = this.form.value.name ? this.form.value.name : null;
      let rif: string = this.form.value.rif;

      /*
      this.companieService.findCompany(name,rif)
        .subscribe((response: ICompany[]) => {
          console.log("buscando empresas");
          console.log(response)
          this.companies = response;
          this.loading.emit(false);
          this.searchedCompanies.emit(this.companies);
        }) */

      this.supplierService.findSupplierById()
    }
  }

}
