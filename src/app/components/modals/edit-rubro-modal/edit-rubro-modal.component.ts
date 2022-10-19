import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ItemsService } from 'src/app/services/items/items.service';
import { IRubro } from 'src/app/interfaces/IRubro';
import { IRubroPatch } from 'src/app/interfaces/IRubroPatch';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

interface IDialogData {
  rubro: IRubro
};

@Component({
  selector: 'app-edit-rubro-modal',
  templateUrl: './edit-rubro-modal.component.html',
  styleUrls: ['./edit-rubro-modal.component.scss']
})
export class EditRubroModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.data.rubro.name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    incidents: new FormControl<string>(this.data.rubro.incidents ? this.data.rubro.incidents : '',[
      Validators.maxLength(250)
    ])
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private dialog: Dialog,
    private itemService: ItemsService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {

    console.log("mostrando form ",this.form.value);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onSubmit() {

    if(this.form.value.name) {

      const payload: IRubroPatch = {
        name: this.form.value.name,
        incidents: this.form.value.incidents ? this.form.value.incidents : ''
      };

      this.itemService.patchRubro(payload,this.data.rubro.id)
        .subscribe((response: any) => {
          this.dialog.open(AlertModalComponent,{
            data: {
              status: 200,
              message: <string>response.label
            }
          });

          this.dialogRef.close();
          this.router.navigateByUrl("/settings/rubros");
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
        });

    }

  }

}
