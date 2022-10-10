import { Component, OnInit, OnChanges ,Input, SimpleChanges } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { Dialog } from '@angular/cdk/dialog';
import { EditInstructionsModalComponent } from '../../modals/edit-instructions-modal/edit-instructions-modal.component';
import { ViewRecipeModalComponent } from '../../modals/view-recipe-modal/view-recipe-modal.component';
import { IStatus } from 'src/app/interfaces/IStatus';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'instructions-table',
  templateUrl: './instructions-table.component.html',
  styleUrls: ['./instructions-table.component.scss']
})
export class InstructionsTableComponent implements OnInit, OnChanges {

  @Input("assignament") assignament: IAssignament | null = null;
  @Input("statues") statues: IStatus[] = [];

  recipes: IRecipe[] = [];

  loading: boolean = false;

  constructor(
    private recipesService: RecipesService,
    private dialog: Dialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("cambio asignacion ",changes['assignament']);

    if(changes["assignament"].currentValue){

      this.loading = true;
      this.recipes = [];
      console.log("probando id assigment ",changes["assignament"]);
      this.assignament = <IAssignament> changes["assignament"].currentValue;
      let id = parseInt(changes["assignament"].currentValue.id);
      this.recipesService.getRecipes(50,0,id).subscribe((response: IRecipe[]) => {
        this.recipes = response;
        this.loading = false;
        console.log("mostrando recipes ",this.recipes)
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
    }
  }

  selectEdit(instruction: IRecipe){
    this.dialog.open(EditInstructionsModalComponent,{
      data: {
        recipe: instruction,
        statues: this.statues
      }
    });
  }

  selectView(instruction: IRecipe){
    this.dialog.open(ViewRecipeModalComponent,{
      data: {
        recipe: instruction,
        assignament: this.assignament
      }
    });
  }

}
