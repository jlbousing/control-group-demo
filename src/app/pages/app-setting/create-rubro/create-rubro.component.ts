

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRubroRequest } from 'src/app/interfaces/IRubroRequest';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'app-create-rubro',
  templateUrl: './create-rubro.component.html',
  styleUrls: ['./create-rubro.component.scss']
})
export class CreateRubroComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    quantity: new FormControl<number>(0,[
      Validators.required,
      Validators.min(0)
    ]),
    unit: new FormControl<string>('ml', Validators.required),
    comments: new FormControl<string>('',[
      Validators.maxLength(250)
    ])
  });

  subcategory: ISubcategory | null = null;

  supplier: ISupplier | null = null;
  supplierId: number = 0;

  loading: boolean = true;

  constructor(
    private supplierService: SuppliersService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private itemService: ItemsService,
    private router: Router,
    private dialog: Dialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.loading = false;

  }

  onSubmit() {

    if(this.form.value.name
      && this.form.value.comments) {

        const payload: IRubroRequest = {
          subcategoryId: 1,
          name: this.form.value.name,
          comments: this.form.value.comments ? this.form.value.comments : ""
        };

        this.itemService.createRubro(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/settings/rubros");
          },(error: HttpErrorResponse) => {
              this.errorHandler.handleError(error);
          });

      }
  }


}
