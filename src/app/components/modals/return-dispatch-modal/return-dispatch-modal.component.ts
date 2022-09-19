import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { DispachtService } from 'src/app/services/dispatch/dispacht.service';
import { IDispatchPatch } from 'src/app/interfaces/IDispatchPatch';
import { IDispatch } from 'src/app/interfaces/IDispacht';

interface IDialogData {
  dispatch: IDispatch
}

@Component({
  selector: 'app-return-dispatch-modal',
  templateUrl: './return-dispatch-modal.component.html',
  styleUrls: ['./return-dispatch-modal.component.scss']
})
export class ReturnDispatchModalComponent implements OnInit {

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
      status: 14
    };

    this.dispatchService.changeStatus(payload,this.data.dispatch.id)
      .subscribe((response: any) => {
        console.log(response);
        alert(response.label);
      })

  }

}
