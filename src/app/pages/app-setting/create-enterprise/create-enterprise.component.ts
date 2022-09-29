import { Component, OnInit } from '@angular/core';
import { ICompanyRequest } from 'src/app/interfaces/ICompanyRequest';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'app-create-enterprise',
  templateUrl: './create-enterprise.component.html',
  styleUrls: ['./create-enterprise.component.scss']
})
export class CreateEnterpriseComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    rif: new FormControl<string>('',Validators.required),
    comercialName: new FormControl<string>('',Validators.required)
  });

  constructor(
    private companiesService: CompaniesService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if(this.form.value.name
      && this.form.value.rif
      && this.form.value.comercialName) {

        const payload: ICompanyRequest = {
          name: this.form.value.name,
          rif: this.form.value.rif,
          comercialName: this.form.value.comercialName
        };

        this.companiesService.createCompanie(payload).subscribe((response: any) => {

          console.log(response)

          if(response !== undefined){
            if(response.status !== undefined){
              if(response.status === 400){
                this.dialog.open(AlertModalComponent,{
                  data: {
                    status: 400,
                    message: <string>response.body.result.message
                  }
                });
              }
            }else{

              this.dialog.open(AlertModalComponent,{
                data: {
                  status: 201,
                  message: <string>response.message.label
                }
              });
              this.router.navigateByUrl('/enterprises')
            }

          }

        },(error: HttpErrorResponse) => {

          this.errorHandler.handleError(error);
        });

      }
  }

}
