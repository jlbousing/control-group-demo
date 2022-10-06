import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { IStatus } from 'src/app/interfaces/IStatus';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IRecipePatch } from 'src/app/interfaces/IRecipePatch';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';

interface IDialogData {
  recipe: IRecipe;
  statues: IStatus[];
}

@Component({
  selector: 'edit-instructions-modal',
  templateUrl: './edit-instructions-modal.component.html',
  styleUrls: ['./edit-instructions-modal.component.scss']
})
export class EditInstructionsModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.data.recipe.name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    description: new FormControl<string>(this.data.recipe.description,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(90)
    ]),
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    private recipeService: RecipesService,
    public dialogRef: DialogRef,
    private dialog: Dialog,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onCloseModal(){
    this.dialogRef.close();
  }

  colorStatus() {
    return statusNameColor(this.data.recipe.statusData.status);
  }

  onSubmit() {

    if(this.form.value.name && this.form.value.description) {

      const payload: IRecipePatch = {
        name: this.form.value.name,
        description: this.form.value.description
      };

      this.recipeService.patchRecipe(payload,this.data.recipe.id)
        .subscribe((response: any) => {

          this.dialog.open(AlertModalComponent,{
            data: {
              status: 200,
              message: response.label
            }
          });

          this.dialogRef.close();

          this.router.navigateByUrl("")

        });
    }
  }

}
