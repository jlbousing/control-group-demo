import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUserRequest } from 'src/app/interfaces/IUserRequest';
import { IRol } from 'src/app/interfaces/IRol';
import { RolsService } from 'src/app/services/rols/rols.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  roles: IRol[] = []

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    username: new FormControl<string>('', Validators.required),
    rol: new FormControl<number | null>(0, Validators.required),
    email: new FormControl<string>('', Validators.required),
    dni: new FormControl<number>(0,Validators.required),
    phone: new FormControl<string>('',Validators.required),
    password1: new FormControl<string>('', Validators.required),
    password2: new FormControl<string>('', Validators.required)
  });

  loading: boolean = true;

  constructor(
    private rolService: RolsService,
    private userService: UsersService,
    private dialog: Dialog,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.rolService.getRoles(50,0).subscribe((response: IRol[]) => {
      this.roles = response;
      console.log("mostrando roles ",this.roles)
      this.loading = false;
    })
  }

  onSubmit(){

    if(this.form.value.name
       && this.form.value.username
       && this.form.value.email
       && this.form.value.rol
       && this.form.value.password1
       && this.form.value.password2
       && this.form.value.dni
       && this.form.value.phone) {

        if(this.form.value.password1 !== this.form.value.password2){

          this.dialog.open(AlertModalComponent,{
            data: {
              status: 400,
              message: "Las contrasenas no coinciden"
            }
          });
        }else if(this.form.value.rol === 0){

          this.dialog.open(AlertModalComponent,{
            data: {
              status: 400,
              message: "Debe seleccionar un Rol de usuario"
            }
          });
        }
        else{
          const payload: IUserRequest = {
            name: this.form.value.name,
            email: this.form.value.email,
            username: this.form.value.username,
            rol: this.form.value.rol,
            password: this.form.value.password1,
            phone: this.form.value.phone,
            dni: this.form.value.dni
          }

          console.log("mostrando payload ",payload);

          this.userService.createUser(payload).subscribe((response: any) => {

            console.log(response)

            if(response !== undefined){
              if(response.status !== undefined){
                if(response.status === 400){

                  this.dialog.open(AlertModalComponent,{
                    data: {
                      status: 400,
                      message: <string>response.body.result.exception
                    }
                  })
                }
              }else{

                this.dialog.open(AlertModalComponent,{
                  data: {
                    status: 201,
                    message: <string>response.message.label
                  }
                });

                this.router.navigateByUrl("/users");

              }

            }

          },
          (error: HttpErrorResponse) => {

            this.errorHandler.handleError(error);
          }
          )
        }

       }
  }

}
