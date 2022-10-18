import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IItemRequest } from 'src/app/interfaces/IItemRequest';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { IRubro } from 'src/app/interfaces/IRubro';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  form = new FormGroup({
    itemId: new FormControl<number>(0,Validators.required),
    brandName: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    volume: new FormControl<number>(0,[
      Validators.required,
      Validators.min(0)
    ]),
    measure: new FormControl<string>('ml', Validators.required),
    comments: new FormControl<string>('',[
      Validators.maxLength(250)
    ])
  });

  subcategoryId: number = 0;
  subcategory: ISubcategory | null = null;

  supplier: ISupplier | null = null;
  supplierId: number = 0;

  loading: boolean = true;

  rubros: IRubro[] = [];

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

    this.itemService.getRubros(50,0)
      .subscribe((response: IRubro[]) => {
        this.rubros = response;
      });

    this.route.params.subscribe(params => {

      this.supplierId = params["supplierId"];

      this.supplierService.findSupplierById(this.supplierId)
        .subscribe((response: ISupplier) => {
          this.supplier = response;

          this.categoriesService.getSubcategoryByCategoryId(this.supplier.categoryData.id)
            .subscribe((response: ISubcategory[]) => {
              this.subcategory = response[0];
              this.subcategoryId = response[0].id
              this.loading = false;
            })
        })
    })

  }

  onSubmit() {


    console.log(this.form.value);
    if(this.form.value.brandName
      && this.form.value.volume
      && this.form.value.measure
      && this.form.value.itemId) {

        const payload: IItemRequest = {
          itemId: this.form.value.itemId,
          brandName: this.form.value.brandName,
          volume: this.form.value.volume,
          measure: this.form.value.measure,
          comments: this.form.value.comments ? this.form.value.comments : ""
        };

        this.itemService.createItem(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/settings/items");
          },(error: HttpErrorResponse) => {
              this.errorHandler.handleError(error);
          });

      }
  }

}
