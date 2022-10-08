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

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

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
    unit: new FormControl<string>('', Validators.required),
    comments: new FormControl<string>('',[
      Validators.minLength(3),
      Validators.maxLength(250)
    ])
  });

  subcategoryId: number = 0;
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
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

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

    if(this.form.value.name
      && this.form.value.quantity
      && this.form.value.unit
      && this.form.value.comments
      && this.subcategoryId > 0) {

        const payload: IItemRequest = {
          subcategoryId: this.subcategoryId,
          name: this.form.value.name,
          quantity: this.form.value.quantity,
          unit: this.form.value.unit,
          comments: this.form.value.comments
        };

        this.itemService.createItem(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/providers/items/"+this.supplierId);
          });

      }
  }

}