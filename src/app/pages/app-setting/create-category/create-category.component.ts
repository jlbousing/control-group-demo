import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { ICategoyRequest } from 'src/app/interfaces/ICategoryRequest';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    description: new FormControl<string>('',Validators.required)
  });


  constructor(
    private categoryService: CategoriesService,
    private dialog: Dialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onSubmit() {

    if(this.form.value.name
       && this.form.value.description) {

        const payload: ICategoyRequest = {
          name: this.form.value.name,
          description: this.form.value.description
        };

        this.categoryService.createCategory(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });
          });

          this.router.navigateByUrl("/settings/categories");

       }
  }

}
