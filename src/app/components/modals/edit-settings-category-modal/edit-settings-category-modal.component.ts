import { Component, OnInit, Inject } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ICategoyRequest } from 'src/app/interfaces/ICategoryRequest';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/ICategory';

interface IDialogData {
  category: ICategory
}

@Component({
  selector: 'app-edit-settings-category-modal',
  templateUrl: './edit-settings-category-modal.component.html',
  styleUrls: ['./edit-settings-category-modal.component.scss']
})
export class EditSettingsCategoryModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.data.category.name,Validators.required),
    description: new FormControl<string>(this.data.category.description,Validators.required)
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private dialog: Dialog,
    private categoryService: CategoriesService,
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

        this.categoryService.patchCategory(payload,this.data.category.id)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent, {
              data: {
                status: 200,
                message: <string>response.label
              }
            });

            this.dialogRef.close();
            this.router.navigateByUrl("/settings/categories");

          });
      }
  }

}
