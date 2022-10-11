import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IReset } from 'src/app/interfaces/IReset';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  token: string | null = "";

  form = new FormGroup({
    password1: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30)
    ]),
    password2: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(30)
    ])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private adminService: AdminService,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.token = params["token"];

      console.log("probando token ",this.token);
    })

  }

  onSubmit() {

    if(this.form.value.password1
      && this.form.value.password2
      && this.token) {

        if(this.form.value.password1 !== this.form.value.password2) {

          this.dialog.open(AlertModalComponent,{
            data: {
              status: 400,
              message: "Las contrasenas no coinciden"
            }
          });

        }else {

          const payload: IReset = {
            password: this.form.value.password1
          }

          this.adminService.reset(payload,this.token)
            .subscribe((response: any) => {

              this.dialog.open(AlertModalComponent,{
                data: {
                  status: 201,
                  message: <string>response.message.label
                }
              });

              this.dialog.open(AlertModalComponent,{})
            },(error) => {
              this.errorHandler.handleError(error);
            });
        }
      }
  }

}
