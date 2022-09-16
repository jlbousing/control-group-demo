import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { CreateInstructionsModalComponent } from 'src/app/components/modals/create-instructions-modal/create-instructions-modal.component';
import { EditInstructionsModalComponent } from 'src/app/components/modals/edit-instructions-modal/edit-instructions-modal.component';
import { ActivatedRoute } from '@angular/router';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IAssignament } from 'src/app/interfaces/IAssignament';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  supplierId: number = 0;
  recipes: IRecipe[] = [];
  assignaments: IAssignament[] = [];
  assignamentId: number = 0;

  constructor(
    private dialog: Dialog,
    private assignamentService: AssignamentService,
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.supplierId = params['supplierId'];

      this.assignamentService.getAssignamentsBySupplier(this.supplierId)
        .subscribe((response: IAssignament[]) => {
          this.assignaments = response;
          console.log("probando asignaciones ",this.assignaments);
        })
   });

  }

  showCreateModal() {
    this.dialog.open(CreateInstructionsModalComponent);
  }

  showEditModal(obj: any) {
    this.dialog.open(EditInstructionsModalComponent);
  }


}
