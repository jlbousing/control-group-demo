import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ICategory } from 'src/app/interfaces/ICategory';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { ISupplierPatch } from 'src/app/interfaces/ISupplierPatch';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form = new FormGroup({
    rif: new FormControl<string>('',Validators.required),
    categoryId: new FormControl<number | null>(null,Validators.required),
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    comercialName: new FormControl<string>('',Validators.required)
  })

  supplier: ISupplier | null = null;

  categories: ICategory[] = [];

  subcategories: ISubcategory[] = [];

  constructor(
    private dialog: Dialog,
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SuppliersService,
    private errorHandler: ErrorHandlerService,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.supplierService.findSupplierById(params["supplierId"])
        .subscribe((response: ISupplier) => {
          this.supplier = response;

          this.form.value.name = this.supplier.name;
          this.form.value.categoryId = this.supplier.categoryData.id;
          this.form.value.rif = this.supplier.rif;
          this.form.value.comercialName = this.supplier.comercialName;
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
        });
    });

    this.categoryService.getCategories(50,0).subscribe((response: ICategory[]) => {
      this.categories = response;
    },(error: HttpErrorResponse) => {
      this.errorHandler.handleError(error);
    });
  }


  onSubmit() {

    if(this.form.value.name
      && this.form.value.rif
      && this.form.value.comercialName
      && this.form.value.categoryId
      && this.supplier) {

        const payload: ISupplierPatch = {
          rif: this.form.value.rif,
          name: this.form.value.name,
          comercialName: this.form.value.comercialName,
          categoryId: this.form.value.categoryId
        };

        this.supplierService.changesSupplier(payload, this.supplier.id)
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
                    status: 200,
                    message: <string>response.label
                  }
                });

                this.router.navigateByUrl('/enterprises');
              }

            }
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });
      }
  }

}
