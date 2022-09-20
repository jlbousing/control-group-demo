import { Component, OnInit } from '@angular/core';
import { CreateAssignmentsModalComponent } from 'src/app/components/modals/create-assignments-modal/create-assignments-modal.component';
import { EditAssignmentsModalComponent } from 'src/app/components/modals/edit-assignments-modal/edit-assignments-modal.component';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { ActivatedRoute } from '@angular/router';
import { IStatus } from 'src/app/interfaces/IStatus';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { StatusService } from 'src/app/services/status/status.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';

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

  statues: IStatus[] = [];
  suppliers: ISupplier[] = [];

  constructor(
    public dialog: Dialog,
    private assignamentService: AssignamentService,
    private route: ActivatedRoute,
    private statusService: StatusService,
    private supplierService: SuppliersService
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

   this.statusService.getStatues(1,50,0)
    .subscribe((response: IStatus[]) => {
      this.statues = response;
    });

    this.supplierService.getSuppliers(1,50,0)
      .subscribe((response: ISupplier[]) => {
        this.suppliers = response;
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

  getSearch(value: string) {
    console.log("probando evento ",value);
  }

}
