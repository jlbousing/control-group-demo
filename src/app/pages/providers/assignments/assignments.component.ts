import { Component, OnInit } from '@angular/core';
import { EditAssignmentsModalComponent } from 'src/app/components/modals/edit-assignments-modal/edit-assignments-modal.component';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import { AssignamentService } from 'src/app/services/assignaments/assignament.service';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { ActivatedRoute } from '@angular/router';
import { IStatus } from 'src/app/interfaces/IStatus';
import { ISupplier } from 'src/app/interfaces/ISupplier';
import { StatusService } from 'src/app/services/status/status.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { AccessService } from 'src/app/services/access/access.service';
import { IAssignamentPicker } from 'src/app/interfaces/IAssignamentPicker';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';

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

  supplier: ISupplier | null = null;

  loading: boolean = true;

  offset: number = 0;

  companyId: number = 0;

  constructor(
    public dialog: Dialog,
    private assignamentService: AssignamentService,
    private route: ActivatedRoute,
    private statusService: StatusService,
    private supplierService: SuppliersService,
    private errorHandler: ErrorHandlerService,
    public accessService: AccessService
  ) { }


  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.companyId = param["companyId"];

      this.assignamentService.getAssignamentsByCompany(this.companyId)
        .subscribe((response: IAssignament[]) => {
          this.assignaments = response;
          this.loading = false;
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        });

    });

   this.statusService.getStatues(2,50,0)
    .subscribe((response: IStatus[]) => {
      this.statues = response;
    },(error: HttpErrorResponse) => {
      this.errorHandler.handleError(error);
      this.loading = false;
    });

    this.supplierService.getSuppliers(1,50,0)
      .subscribe((response: ISupplier[]) => {
        this.suppliers = response;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });

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

  getSearch(value: any) {


    console.log("llamand evento ",value);

    const pickerData: IAssignamentPicker = <IAssignamentPicker>value;

    if(pickerData) {

      this.assignaments = [];

      this.assignamentService.getAssignamentsByDates(
        1,pickerData.startDate,
        pickerData.endDate,
        50,0)
        .subscribe((response: IAssignament[]) => {
          this.assignaments = response;
        },(error: HttpErrorResponse) => {

          this.errorHandler.handleError(error);

          if(error.status == 404) {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 404,
                message: "No se encuentran asignaciones en las fechas seleccionadas"
              }
            });

          }

          this.assignamentService.getAssignamentsByCompany(this.companyId)
        .subscribe((response: IAssignament[]) => {
          this.assignaments = response;
          this.loading = false;
          console.log("probando asignaciones ",this.assignaments);
          this.loading = false;
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        });

        });
    }else {
      this.assignamentService.getAssignamentsByCompany(this.companyId)
        .subscribe((response: IAssignament[]) => {
          this.assignaments = response;
          this.loading = false;
          console.log("probando asignaciones ",this.assignaments);
          this.loading = false;
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
          this.loading = false;
        });
    }
  }

}
