import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { IAssignamentRequest } from 'src/app/interfaces/IAssignamentRequest';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { StorageManager } from 'src/app/utils/StorageManager';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'app-create-assignments',
  templateUrl: './create-assignments.component.html',
  styleUrls: ['./create-assignments.component.scss']
})
export class CreateAssignmentsComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    supplierId: new FormControl<number>(0,Validators.required),
    categoryId: new FormControl<number>(0,Validators.required),
    subcategoryId: new FormControl<number>(0,Validators.required),
    description: new FormControl<string>('',Validators.required),
    comments: new FormControl<string>('',Validators.required),
    record: new FormControl<number>(0,Validators.required),
    special: new FormControl<boolean>(false,Validators.required)
  });

  categoryId: number = 0;
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  suppliers: ISupplier[] = [];

  loading: boolean = true;

  constructor(
    private categoryService: CategoriesService,
    private suppliersService: SuppliersService,
    private assignmentService: AssignamentService,
    private router: Router,
    private dialog: Dialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.categoryService.getCategories(50,0)
      .subscribe((response: ICategory[]) => {
        this.categories = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });

    this.suppliersService.getSuppliers
  }

  setSubcategoryId(id: any) {
    console.log("recibiendo subcategoria ",id);
    this.form.patchValue({
      subcategoryId: parseInt(id)
    })
  }

  setSuppliers(id: any){

    this.loading = true;
    this.suppliersService.getSuppliers(id,50,0)
      .subscribe((response: ISupplier[]) => {
        this.suppliers = response;
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }

  onSubmit(){

    console.log(this.form.value);

    if(this.form.value.name
       && this.form.value.supplierId
       && this.form.value.categoryId
       && this.form.value.subcategoryId
       && this.form.value.description
       && this.form.value.comments
       && this.form.value.record
       && this.form.value.special !== undefined
       && this.form.value.special !== null) {

        const userInfo: any = StorageManager.getFromLocalStorage('userInfo');

        const payload: IAssignamentRequest = {
          name: this.form.value.name,
          subcategoryId: this.form.value.subcategoryId,
          suppliersId: this.form.value.supplierId,
          userId: userInfo.id,
          description: this.form.value.description,
          comments: this.form.value.comments,
          record: this.form.value.record,
          special: this.form.value.special
        };

        this.assignmentService.createAssignaments(payload).subscribe((response: any) => {

          console.log(response)

          if(response !== undefined){
            if(response.status !== undefined){
              if(response.status === 400){
                this.dialog.open(AlertModalComponent,{
                  data: {
                    status: 400,
                    message: <string>response.body.result.exception
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

              this.router.navigateByUrl("/providers/assignments/"+this.form.value.supplierId);
            }

          }

        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        })
       }
  }

}
