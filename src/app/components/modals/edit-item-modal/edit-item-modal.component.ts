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
import { IRubro } from 'src/app/interfaces/IRubro';
import { IItemRequest } from 'src/app/interfaces/IItemRequest';

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
    itemId: new FormControl<number>(this.data.item.itemData.id ? this.data.item.itemData.id : 0,Validators.required),
    brandName: new FormControl<string>(this.data.item.brandName,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    volume: new FormControl<number>(this.data.item.volume,Validators.required),
    measure: new FormControl<string>(this.data.item.measure,Validators.required),
    comments: new FormControl<string | null>(this.data.item.comments,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250)
    ])
  });

  rubros: IRubro[] = [];

  loading: boolean = true;

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

    this.itemsService.getRubros(50,0)
      .subscribe((response: IRubro[]) => {

        this.rubros = response;
        this.loading = false;

      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }


  onSubmit() {

    if(this.form.value.brandName
      && this.form.value.volume
      && this.form.value.measure
      && this.form.value.comments) {

        const payload: IItemRequest = {
          itemId: this.form.value.itemId ? this.form.value.itemId : this.data.item.id,
          brandName: this.form.value.brandName,
          volume: this.form.value.volume,
          measure: this.form.value.measure,
          comments: this.form.value.comments
        };

        this.itemsService.changeTypeItem(payload,this.data.item.id)
          .subscribe((response: any) => {
            this.dialog.open(AlertModalComponent,{
              data: {
                status: 200,
                message: <string>response.label
              }
            });
            this.router.navigateByUrl("/settings/items")
            this.dialogRef.close();
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error);
          });
      }
  }

}
