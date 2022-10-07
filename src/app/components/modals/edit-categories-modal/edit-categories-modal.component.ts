import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { IStatus} from 'src/app/interfaces/IStatus';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { ISubcategoryPatch } from 'src/app/interfaces/ISubcategoryPatch';

interface IDialogData {
  subcategory: ISubcategory,
  statues: IStatus[],
  supplierId: number;
}

@Component({
  selector: 'edit-categories-modal',
  templateUrl: './edit-categories-modal.component.html',
  styleUrls: ['./edit-categories-modal.component.scss']
})
export class EditCategoriesModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.data.subcategory.name ? this.data.subcategory.name : '',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    description: new FormControl<string>(this.data.subcategory.description ? this.data.subcategory.description : '',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(90)
    ]),
    status: new FormControl<boolean>(false, Validators.required),
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private categoryService: CategoriesService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private dialog: Dialog) {

     }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  colorStatus() {
    return statusNameColor(this.data.subcategory.status ? "Activo" : "Inactivo");
  }

  onSubmit() {

    console.log(this.form.value);
    if(this.form.value.name
      && this.form.value.description
      && this.form.value.status !== undefined
      && this.form.value.status) {

        const payload: ISubcategoryPatch = {
          name: this.form.value.name,
          description: this.form.value.description,
          status: this.form.value.status
        };

        this.categoryService.patchSubcategory(payload,this.data.subcategory.id)
          .subscribe((response: any) => {
            console.log(response);
            this.dialog.open(AlertModalComponent,{
              data: {
                status: 200,
                message: <string>response.label
              }
            });

            this.dialogRef.close();
            this.router.navigateByUrl(`/providers/categories/${this.data.supplierId}`);

          },(error: HttpErrorResponse) => {

            this.errorHandler.handleError(error);
          });
      }
  }


}
