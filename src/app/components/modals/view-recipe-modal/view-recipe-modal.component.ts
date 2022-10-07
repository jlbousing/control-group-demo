import { Component, OnInit, Inject } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { IAssignament } from 'src/app/interfaces/IAssignament';

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
    public dialogRef: DialogRef
  ) { }

  colorStatus() {
    return statusNameColor(this.data.recipe.statusData.status);
  }

  ngOnInit(): void {

  }


}
