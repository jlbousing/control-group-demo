import { Component, OnInit } from '@angular/core';
import { CreateProductionModalComponent } from 'src/app/components/modals/create-production-modal/create-production-modal.component';
import { ViewProductionModalComponent } from 'src/app/components/modals/view-production-modal/view-production-modal.component';
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {

  showModalCreate: boolean = false;
  showModalEdit: boolean = false;

  constructor(public dialog: Dialog) { }


  ngOnInit(): void {
  }

  showCreateModal() {
    this.dialog.open(CreateProductionModalComponent);
  }

  closeModalCreate(msg: boolean){
    console.log("hey uya");
    this.showModalCreate = false;
  }

  showEditModal(obj: any) {
    this.dialog.open(ViewProductionModalComponent);
  }

  closeModalEdit(msg: boolean){
    console.log("hey uya");
    this.showModalEdit = false;
  }

}
