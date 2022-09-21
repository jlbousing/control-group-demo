import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { DispachtService } from 'src/app/services/dispatch/dispacht.service';
import { IDispatchPatch } from 'src/app/interfaces/IDispatchPatch';
import { IDispatch } from 'src/app/interfaces/IDispacht';

interface IDialogData {
  dispatch: IDispatch
}

@Component({
  selector: 'edit-dispatch-modal',
  templateUrl: './edit-dispatch-modal.component.html',
  styleUrls: ['./edit-dispatch-modal.component.scss']
})
export class EditDispatchModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private dispatchService: DispachtService
  ) { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.dialogRef.close();
  }

  changeStatus(id: number) {

    const payload: IDispatchPatch = {
      status: 10
    };

    this.dispatchService.changeStatus(payload,this.data.dispatch.id)
      .subscribe((response: any) => {
        console.log(response);
        alert(response.label);
      })

  }

}
