import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAssignamentRequest } from 'src/app/interfaces/IAssignamentRequest';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { StorageManager } from 'src/app/utils/StorageManager';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';

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
    record: new FormControl<number>(0,Validators.required)
  });

  categoryId: number = 0;
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  suppliers: ISupplier[] = [];

  constructor(
    private categoryService: CategoriesService,
    private suppliersService: SuppliersService,
    private assignmentService: AssignamentService
  ) { }

  ngOnInit(): void {

    this.categoryService.getCategories()
      .subscribe((response: ICategory[]) => {
        this.categories = response;
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
    this.suppliersService.getSuppliers(id,50,0)
      .subscribe((response: ISupplier[]) => {
        this.suppliers = response;
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
       && this.form.value.record) {

        const userInfo: any = StorageManager.getFromLocalStorage('userInfo');

        const payload: IAssignamentRequest = {
          name: this.form.value.name,
          subcategoryId: this.form.value.subcategoryId,
          suppliersId: this.form.value.supplierId,
          userId: userInfo.id,
          description: this.form.value.description,
          comments: this.form.value.comments,
          record: this.form.value.record
        };

        this.assignmentService.createAssignaments(payload).subscribe((response: any) => {

          console.log(response)

          if(response !== undefined){
            if(response.status !== undefined){
              if(response.status === 400){
                alert(response.body.result.exception)
              }
            }else{
              alert(response.message.label)
            }

          }

        })
       }
  }

}
