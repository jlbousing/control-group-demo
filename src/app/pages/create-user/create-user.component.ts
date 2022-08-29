import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUserRequest } from 'src/app/interfaces/IUserRequest';
import { IRol } from 'src/app/interfaces/IRol';
import { RolsService } from 'src/app/services/rols/rols.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  roles: IRol[] = []

  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    username: new FormControl<string>('', Validators.required),
    rol: new FormControl<number | null>(0, Validators.required),
    email: new FormControl<string>('', Validators.required),
    password1: new FormControl<string>('', Validators.required),
    password2: new FormControl<string>('', Validators.required)
  });

  constructor(
    private rolService: RolsService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {

    this.rolService.getRoles(50,0).subscribe((response: IRol[]) => {
      this.roles = response;
      console.log("mostrando roles ",this.roles)
    })
  }

  onSubmit(){

    if(this.form.value.name
       && this.form.value.username
       && this.form.value.email
       && this.form.value.rol
       && this.form.value.password1
       && this.form.value.password2) {

        if(this.form.value.password1 !== this.form.value.password2){
          alert("Las contrasenas no coinciden");
        }else if(this.form.value.rol === 0){
          alert("Debe seleccionar un Rol de usuario");
        }
        else{
          const payload: IUserRequest = {
            name: this.form.value.name,
            email: this.form.value.email,
            username: this.form.value.username,
            rol: this.form.value.rol,
            password: this.form.value.password1
          }

          console.log("mostrando payload ",payload);

          this.userService.createUser(payload).subscribe((response: any) => {

            console.log(response)

            if(response !== undefined){
              if(response.status !== undefined){
                if(response.status === 400){
                  alert(response.body.result.exception)
                }
              }else{
                alert(response.message.label)
              }

            }

          })
        }

       }
  }

}
