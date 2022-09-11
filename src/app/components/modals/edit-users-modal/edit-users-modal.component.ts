import { Component, OnInit, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IUser } from 'src/app/interfaces/user.model';
import { IStatus } from 'src/app/interfaces/IStatus';
import { IRol } from 'src/app/interfaces/IRol';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface IDialogData {
  user: IUser,
  statues: IStatus[],
  roles: IRol[]
}

@Component({
  selector: 'edit-users-modal',
  templateUrl: './edit-users-modal.component.html',
  styleUrls: ['./edit-users-modal.component.scss']
})
export class EditUsersModalComponent implements OnInit {

  form = new FormGroup({
    rol: new FormControl<number>(this.data.user.rolData.id,Validators.required),
    status: new FormControl<number>(this.data.user.statusData.id, Validators.required)
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef
  ) { }

  ngOnInit(): void {
    console.log("hey uya ",this.data)
  }

}
