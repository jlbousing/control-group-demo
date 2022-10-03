import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { ILogin } from 'src/app/interfaces/Ilogin';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { StorageManager } from 'src/app/utils/StorageManager';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl<string>('',Validators.required),
    password: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30)
    ])
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if(this.form.value.username
      && this.form.value.password) {

        const payload: ILogin = {
          username: this.form.value.username,
          password: this.form.value.password
        };

        this.loginService.login(payload)
          .subscribe((response: any) => {
            console.log(response);
            StorageManager.setJSONToLocalStorage('userInfo',response);
            StorageManager.setJSONToLocalStorage("token",response.token);
            this.router.navigateByUrl("/home");
          },
          (error: HttpErrorResponse) => {
            console.log("asdasdasd");
            this.errorHandler.handleError(error);
          })
      }
  }

}
