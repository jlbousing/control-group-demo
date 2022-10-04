import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { HttpResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { ISubcategoryRequest } from 'src/app/interfaces/ISubcategoryRequest';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.scss']
})
export class CreateSubCategoryComponent implements OnInit {

  categories: ICategory[] = [];
  supplierId: number = 0;

  form = new FormGroup({
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    description: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(90)
    ]),
    categoryId: new FormControl<number>(0,[Validators.required])
  });


  constructor(
    private categoryService: CategoriesService,
    private dialog: Dialog,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.supplierId = params["supplierId"];
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.categoryService.getCategories(50,0).subscribe((response: ICategory[]) => {
      this.categories = response;
    });
  }

  onSubmit() {

    if(this.form.value.name
       && this.form.value.description
       && this.form.value.categoryId) {

        const payload: ISubcategoryRequest = {
          name: this.form.value.name,
          description: this.form.value.description,
          categoryId: this.form.value.categoryId,
          items: []
        };

        this.categoryService.createSubCategory(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/providers/categories/"+this.supplierId);
          },(error) => {
            this.errorHandler.handleError(error);
          });

       }
  }

}
