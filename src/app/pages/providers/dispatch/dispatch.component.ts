import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { CreateDispatchModalComponent } from 'src/app/components/modals/create-dispatch-modal/create-dispatch-modal.component';
import { EditDispatchModalComponent } from 'src/app/components/modals/edit-dispatch-modal/edit-dispatch-modal.component';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {

  showModalCreate: boolean = false;
  showModalEdit: boolean = false;

  constructor(public dialog: Dialog) { }


  ngOnInit(): void {
  }

  showCreateModal() {
    this.dialog.open(CreateDispatchModalComponent);
  }

  closeModalCreate(msg: boolean){
    console.log("hey uya");
    this.showModalCreate = false;
  }

  showEditModal(obj: any) {
    this.dialog.open(EditDispatchModalComponent);
  }

  closeModalEdit(msg: boolean){
    console.log("hey uya");
    this.showModalEdit = false;
  }

}
