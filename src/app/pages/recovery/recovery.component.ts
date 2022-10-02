import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { Router } from '@angular/router';
import { IRecovery } from 'src/app/interfaces/IRecovery';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl<string>('',Validators.required)
  });

  constructor(
    private adminService: AdminService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if(this.form.value.email) {

      const payload: IRecovery = {
        email: this.form.value.email
      };

      this.adminService.recovery(payload)
        .subscribe((response: any) => {
          this.dialog.open(AlertModalComponent,{
            data: {
              status: 200,
              message: <string>response.message.label
            }
          });
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
        });
    }
  }

}
