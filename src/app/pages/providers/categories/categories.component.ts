import { Component, OnInit} from '@angular/core';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import { CreateCategoriesModalComponent } from 'src/app/components/modals/create-categories-modal/create-categories-modal.component';
import { EditCategoriesModalComponent } from 'src/app/components/modals/edit-categories-modal/edit-categories-modal.component';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { IStatus } from 'src/app/interfaces/IStatus';
import { StatusService } from 'src/app/services/status/status.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  subcategories: ISubcategory[] = [];
  supplierId: number = 0;
  statues: IStatus[] = [];
  supplier: ISupplier | null = null;

  loading: boolean = true;

  constructor(
    public dialog: Dialog,
    private categoriesService: CategoriesService,
    private supplierService: SuppliersService,
    private route: ActivatedRoute,
    private statusSevice: StatusService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.supplierId = params['supplierId'];

      //SE CABLEA CON ID 1 POR LOS MOMENTOS
      this.supplierService.findSupplierById(this.supplierId)
        .subscribe((response: ISupplier) => {
          this.supplier = response;

          //SE CONSUMEN LAS CATEGORIAS
          this.categoriesService.getSubcategoryByCategoryId(this.supplier.categoryData.id)
        .subscribe((response: ISubcategory[]) => {
          this.subcategories = response;
          this.loading = false;
        })
        });



      this.statusSevice.getStatues(1,50,0)
        .subscribe((response: IStatus[]) => {
          this.statues = response;
        })

   });
  }

  showCreateModal() {
    this.dialog.open(CreateCategoriesModalComponent);
  }

  showEditModal(obj: any) {
    this.dialog.open(EditCategoriesModalComponent);
  }

  getSearch(value: any) {

    this.loading = true;

    if(value && value !== "") {
      let id = <number>value;

    this.categoriesService.findSubcategory(id)
      .subscribe((response: ISubcategory) => {
        this.subcategories = [];
        this.subcategories.push(response);
        this.loading = false;
      })
    }else {

      this.supplierService.findSupplierById(this.supplierId)
        .subscribe((response: ISupplier) => {
          this.supplier = response;

          //SE CONSUMEN LAS CATEGORIAS
          this.categoriesService.getSubcategoryByCategoryId(this.supplier.categoryData.id)
        .subscribe((response: ISubcategory[]) => {
          console.log("entra aqui ",response);
          if(response) {
            this.subcategories = response;
          }else {
            console.log("entra aqui ",response);
            this.subcategories = [];
          }

          this.loading = false;
        })
        });
    }
  }


}
