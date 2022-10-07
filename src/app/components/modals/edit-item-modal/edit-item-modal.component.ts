import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ItemsService } from 'src/app/services/items/items.service';
import { IItem } from 'src/app/interfaces/IItem';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { IItemPatch } from 'src/app/interfaces/IItemPatch';

interface IDialogData {
  item: IItem,
  supplierId: number;
}

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.data.item.name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    quantity: new FormControl<number>(this.data.item.quantity,Validators.required),
    unit: new FormControl<string>(this.data.item.unit,Validators.required),
    comments: new FormControl<string | null>(this.data.item.comments,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250)
    ])
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private itemsService: ItemsService,
    private router: Router,
    private dialog: Dialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  onSubmit() {

    if(this.form.value.name
      && this.form.value.quantity
      && this.form.value.unit
      && this.form.value.comments) {

        const payload: IItemPatch = {
          name: this.form.value.name,
          quantity: this.form.value.quantity,
          unit: this.form.value.unit,
          comments: this.form.value.comments
        };

        this.itemsService.changeItem(payload,this.data.item.id)
          .subscribe((response: any) => {
            this.dialog.open(AlertModalComponent,{
              data: {
                status: 200,
                message: <string>response.label
              }
            });
            this.router.navigateByUrl("/providers/items/"+this.data.supplierId)
            this.dialogRef.close();
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });
      }
  }

}
