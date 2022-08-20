import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { CreateInstructionsModalComponent } from 'src/app/components/modals/create-instructions-modal/create-instructions-modal.component';
import { EditInstructionsModalComponent } from 'src/app/components/modals/edit-instructions-modal/edit-instructions-modal.component';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  showModalCreate: boolean = false;
  showModalEdit: boolean = false;

  constructor(private dialog: Dialog) { }


  ngOnInit(): void {
  }

  showCreateModal() {
    this.dialog.open(CreateInstructionsModalComponent);
  }

  closeModalCreate(msg: boolean){
    console.log("hey uya");
    this.showModalCreate = false;
  }

  showEditModal(obj: any) {
    this.dialog.open(EditInstructionsModalComponent);
  }

  closeModalEdit(msg: boolean){
    console.log("hey uya");
    this.showModalEdit = false;
  }

}
