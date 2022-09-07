import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAssignamentRequest } from 'src/app/interfaces/IAssignamentRequest';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';

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
    comments: new FormControl<string>('',Validators.required)
  });

  categoryId: number = 0;
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];

  constructor(
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {

    this.categoryService.getCategories()
      .subscribe((response: ICategory[]) => {
        this.categories = response;
      });
  }

  setSubcategoryId(id: any) {
    console.log("recibiendo subcategoria ",id);
    this.form.patchValue({
      subcategoryId: parseInt(id)
    })
  }

  onSubmit(){

    console.log(this.form.value);
  }

}
