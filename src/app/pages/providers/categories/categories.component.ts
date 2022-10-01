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
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { StorageManager } from 'src/app/utils/StorageManager';

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
  rol: number = 0;

  constructor(
    public dialog: Dialog,
    private categoriesService: CategoriesService,
    private supplierService: SuppliersService,
    private route: ActivatedRoute,
    private statusSevice: StatusService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.rol = StorageManager.getFromLocalStorage("userInfo").rol;

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
                                },(error: HttpErrorResponse) => {
                                  this.errorHandler.handleError(error);
                                });
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
        });



      this.statusSevice.getStatues(1,50,0)
        .subscribe((response: IStatus[]) => {
          this.statues = response;
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
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
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
    }else {

      this.supplierService.findSupplierById(this.supplierId)
        .subscribe((response: ISupplier) => {
          this.supplier = response;

          //SE CONSUMEN LAS CATEGORIAS
          this.categoriesService.getSubcategoryByCategoryId(this.supplier.categoryData.id)
                                .subscribe((response: ISubcategory[]) => {
                                    if(response) {
                                        this.subcategories = response;
                                    }else {
                                        this.subcategories = [];
                                    }
                                    this.loading = false;
                                 },(error: HttpErrorResponse) => {
                                      this.errorHandler.handleError(error);
                                      this.loading = false;
                                });
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        });
    }
  }

  canCreate() {

    switch(this.rol) {
      case 1:
        return true;
        break;
      case 2:
        return true;
        break;
      case 3:
        return true;
        break;
      default:
        return false;
    }
  }


}
