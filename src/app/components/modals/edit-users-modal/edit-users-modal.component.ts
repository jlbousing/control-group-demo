import { Component, OnInit, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef, Dialog } from '@angular/cdk/dialog';
import { IUser } from 'src/app/interfaces/user.model';
import { IStatus } from 'src/app/interfaces/IStatus';
import { IRol } from 'src/app/interfaces/IRol';
import { IUserPatch } from 'src/app/interfaces/IUserPatch';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

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
    name: new FormControl<string>(this.data.user.name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    //username: new FormControl<string>(this.data.user.username,Validators.required),
    email: new FormControl<string>(this.data.user.email,[
      Validators.required,
      Validators.email,
      Validators.maxLength(30)
    ]),
    phone: new FormControl<string>(this.data.user.phone,[
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30)
    ]),
    password1: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(10)
    ]),
    password2: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(10)
    ]),
    rol: new FormControl<number>(this.data.user.rolData.id,Validators.required),
    status: new FormControl<number>(this.data.user.statusData.id, Validators.required)
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private userService: UsersService,
    private dialog: Dialog,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onSubmit() {

    if(this.form.value.name
       //&& this.form.value.username
       && this.form.value.rol
       && this.form.value.status
       && this.form.value.email
       && this.form.value.phone
       && this.form.value.password1
       && this.form.value.password2) {

        if(this.form.value.password1 === this.form.value.password2) {

          const payload: IUserPatch = {
            name: this.form.value.name,
            email: this.form.value.email,
            phone: this.form.value.phone,
            password: this.form.value.password1,
            rol: this.form.value.rol,
            status: this.form.value.status
          };

          this.userService.patchUser(payload,this.data.user.id)
            .subscribe((response: any) => {
              this.dialog.open(AlertModalComponent,{
                data: {
                  status: 200,
                  message: <string>response.label
                }
              });

              this.dialogRef.close();
              this.router.navigateByUrl("/users");

            },(error: HttpErrorResponse) => {
              this.errorHandler.handleError(error);
            });
        }else{

          this.dialog.open(AlertModalComponent,{
            data: {
              status: 400,
              message: "Las contraseñas no coincidien"
            }
          });
        }

       }
  }

}
