import { Component, OnInit } from '@angular/core';
import { ICompany } from 'src/app/interfaces/ICompanies';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISupplierRequest } from 'src/app/interfaces/ISupplierRequest';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss']
})
export class CreateProviderComponent implements OnInit {

  categories: ICategory[] = [];
  companies: ICompany[] = [];

  form = new FormGroup({
    rif: new FormControl<string>('',Validators.required),
    categoryId: new FormControl<number | null>(null,Validators.required),
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    comercialName: new FormControl<string>('',Validators.required),
    companyId: new FormControl<number | null>(null,Validators.required)
  })

  constructor(
    private categoryService: CategoriesService,
    private companyService: CompaniesService,
    private supplierService: SuppliersService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {

    this.categoryService.getCategories(50,0).subscribe((response: ICategory[]) => {
      this.categories = response;
    });

    this.companyService.getCompanies(50,0).subscribe((response: ICompany[]) => {
      this.companies = response;
    });
  }

  onSubmit() {

    if(this.form.value.name
      && this.form.value.rif
      && this.form.value.companyId
      && this.form.value.comercialName
      && this.form.value.categoryId) {

        const payload: ISupplierRequest = {
          rif: this.form.value.rif,
          name: this.form.value.name,
          companyId: this.form.value.companyId,
          comercialName: this.form.value.comercialName,
          categoryId: this.form.value.categoryId
        };

        this.supplierService.createSupplier(payload)
          .subscribe((response: any) => {

            if(response !== undefined){
              if(response.status !== undefined){
                if(response.status === 400){

                  this.dialog.open(AlertModalComponent,{
                    data: {
                      status: 400,
                      message: <string>response.body.result.message
                    }
                  });
                }
              }else{

                this.dialog.open(AlertModalComponent,{
                  data: {
                    status: 201,
                    message: <string>response.message.label
                  }
                });

                this.router.navigateByUrl('/dashboard/enterprises');
              }

            }
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });
      }
  }

}
