import { Component, OnInit, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IUser } from 'src/app/interfaces/user.model';
import { IStatus } from 'src/app/interfaces/IStatus';
import { IRol } from 'src/app/interfaces/IRol';
import { IUserPatch } from 'src/app/interfaces/IUserPatch';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';

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
    name: new FormControl<string>(this.data.user.name,Validators.required),
    //username: new FormControl<string>(this.data.user.username,Validators.required),
    rol: new FormControl<number>(this.data.user.rolData.id,Validators.required),
    status: new FormControl<number>(this.data.user.statusData.id, Validators.required)
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    console.log("hey uya ",this.data)
  }

  onSubmit() {

    if(this.form.value.name
       //&& this.form.value.username
       && this.form.value.rol
       && this.form.value.status) {

        const payload: IUserPatch = {
          name: this.form.value.name,
          //username: this.form.value.username,
          rol: this.form.value.rol,
          status: this.form.value.status
        };

        this.userService.patchUser(payload,this.data.user.id)
          .subscribe((response: any) => {
            alert(response.label);
          })

       }
  }

}
