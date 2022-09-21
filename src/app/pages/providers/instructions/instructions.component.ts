import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { CreateInstructionsModalComponent } from 'src/app/components/modals/create-instructions-modal/create-instructions-modal.component';
import { EditInstructionsModalComponent } from 'src/app/components/modals/edit-instructions-modal/edit-instructions-modal.component';
import { ActivatedRoute } from '@angular/router';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { StatusService } from 'src/app/services/status/status.service';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IStatus } from 'src/app/interfaces/IStatus';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ISupplier } from 'src/app/interfaces/ISupplier';

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
  assignament: IAssignament | null = null;
  statues: IStatus[] = [];

  loading: boolean = true;

  supplier: ISupplier | null = null;

  constructor(
    private dialog: Dialog,
    private assignamentService: AssignamentService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private statusService: StatusService,
    private supplierService: SuppliersService
  ) { }


  ngOnInit(): void {

    this.statusService.getStatues(1,50,0)
      .subscribe((response: IStatus[]) => {
        this.statues = response;
      });

    this.route.params.subscribe(params => {
      this.supplierId = params['supplierId'];

      this.supplierService.findSupplierById(this.supplierId)
        .subscribe((response: ISupplier) => {
          this.supplier = response
        })

      this.assignamentService.getAssignamentsBySupplier(this.supplierId)
        .subscribe((response: IAssignament[]) => {
          this.assignaments = response;
          this.loading = false;
          console.log("probando asignaciones ",this.assignaments);
        })
   });

  }

  setAssignament(value: any) {
    let assignament = <IAssignament> value;
    this.assignament = assignament;
    console.log("probando asignacion ",value)
  }

  showCreateModal() {
    this.dialog.open(CreateInstructionsModalComponent);
  }

  showEditModal(obj: any) {
    this.dialog.open(EditInstructionsModalComponent);
  }

  getSearch(value: any) {

  }


}
