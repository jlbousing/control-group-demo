import { Component, OnInit} from '@angular/core';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import { CreateCategoriesModalComponent } from 'src/app/components/modals/create-categories-modal/create-categories-modal.component';
import { EditCategoriesModalComponent } from 'src/app/components/modals/edit-categories-modal/edit-categories-modal.component';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  subcategories: ISubcategory[] = [];
  supplierId: number = 0;

  constructor(
    public dialog: Dialog,
    private categoriesService: CategoriesService,
    private supplierService: SuppliersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.supplierId = params['supplierId'];

      this.categoriesService.getSubcategoryByCategoryId(1)
        .subscribe((response: ISubcategory[]) => {
          this.subcategories = response;
        })

   });
  }

  showCreateModal() {
    this.dialog.open(CreateCategoriesModalComponent);
  }

  showEditModal(obj: any) {
    this.dialog.open(EditCategoriesModalComponent);
  }


}
