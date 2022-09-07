import { Component, OnInit } from '@angular/core';
import { CreateAssignmentsModalComponent } from 'src/app/components/modals/create-assignments-modal/create-assignments-modal.component';
import { EditAssignmentsModalComponent } from 'src/app/components/modals/edit-assignments-modal/edit-assignments-modal.component';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  showModalCreate: boolean = false;
  showModalEdit: boolean = false;

  assignaments: IAssignament[] = [];
  supplierId: number = 0;

  constructor(
    public dialog: Dialog,
    private assignamentService: AssignamentService,
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
    //this.showModalCreate = true;
    this.dialog.open(CreateAssignmentsModalComponent);
  }

  closeModalCreate(msg: boolean){
    console.log("hey uya");
    this.showModalCreate = false;
  }

  showEditModal(obj: any) {
    //this.showModalEdit = true;
    this.dialog.open(EditAssignmentsModalComponent);
  }

  closeModalEdit(msg: boolean){
    console.log("hey uya");
    this.showModalEdit = false;
  }

}
