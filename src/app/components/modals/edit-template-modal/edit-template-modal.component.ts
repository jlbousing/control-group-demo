import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { TemplateService } from 'src/app/services/templates/template.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';
import { ITemplate } from 'src/app/interfaces/ITemplate';
import { ITemplatePatch } from 'src/app/interfaces/ITemplatePatch';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { HttpErrorResponse } from '@angular/common/http';

interface IDialogData {
  template: ITemplate;
  supplierId: number;
}

@Component({
  selector: 'app-edit-template-modal',
  templateUrl: './edit-template-modal.component.html',
  styleUrls: ['./edit-template-modal.component.scss']
})
export class EditTemplateModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.data.template.name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    status: new FormControl<boolean>(this.data.template.status,[
      Validators.required
    ])
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    private dialog: Dialog,
    public dialogRef: DialogRef,
    private router: Router,
    private templateService: TemplateService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onSubmit() {

    if(this.form.value.name
       && this.form.value.status !== undefined
       && this.form.value.status !== null) {

        const payload: ITemplatePatch = {
          name: this.form.value.name,
          status: this.form.value.status
        };

        this.templateService.patchTemplate(payload,this.data.template.id)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 200,
                message: <string>response.label
              }
            });

            this.dialogRef.close();

            this.router.navigateByUrl(`/providers/templates/${this.data.supplierId}`);

          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });
       }

  }

}
