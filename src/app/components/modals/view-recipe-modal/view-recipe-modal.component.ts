import { Component, OnInit, Inject } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { HttpErrorResponse } from 'control-group-admin/node_modules/@angular/common/http';

interface IDialogData {
  recipe: IRecipe
  assignament: IAssignament
}

@Component({
  selector: 'app-view-recipe-modal',
  templateUrl: './view-recipe-modal.component.html',
  styleUrls: ['./view-recipe-modal.component.scss']
})
export class ViewRecipeModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private recipeService: RecipesService,
    private errorHandler: ErrorHandlerService
  ) { }

  img: HTMLElement | null = null;

  colorStatus() {
    return statusNameColor(this.data.recipe.statusData.status);
  }

  ngOnInit(): void {

    this.img = document.getElementById("img");

    console.log("mostrando receta ",this.data.recipe);

    this.recipeService.getImage(this.data.recipe.image)
      .subscribe((response: any) => {

        var reader = new FileReader();
        reader.readAsDataURL(response)
        reader.onloadend = function() {
        var base64data = reader.result?.toString();
        console.log(base64data);
        document.getElementById("img")?.setAttribute("src",base64data!.toString());
        }
      },(error: HttpErrorResponse) => {
          console.log(error);
      });
  }


}
