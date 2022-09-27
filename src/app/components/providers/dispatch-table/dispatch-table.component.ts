import { Component, OnInit, Input } from '@angular/core';
import { IDispatch } from 'src/app/interfaces/IDispacht';
import { IProduction } from 'src/app/interfaces/IProduction';
import { Dialog } from '@angular/cdk/dialog';
import { EditDispatchModalComponent } from '../../modals/edit-dispatch-modal/edit-dispatch-modal.component';
import { ReturnDispatchModalComponent } from '../../modals/return-dispatch-modal/return-dispatch-modal.component';
import { ViewDispatchModalComponent } from '../../modals/view-dispatch-modal/view-dispatch-modal.component';

@Component({
  selector: 'dispatch-table',
  templateUrl: './dispatch-table.component.html',
  styleUrls: ['./dispatch-table.component.scss']
})
export class DispatchTableComponent implements OnInit {

  @Input("dispatchs") dispatchs: IDispatch[] = [];
  @Input("production") production: IProduction | null = null;

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectEdit(dispatch: IDispatch){

    this.dialog.open(EditDispatchModalComponent,{
      data: {
        dispatch: dispatch
      }
    });
  }

  returnDispatch(dispatch: IDispatch){

    this.dialog.open(ReturnDispatchModalComponent,{
      data: {
        dispatch: dispatch
      }
    });
  }

  viewDispatch(dispatch: IDispatch){

    this.dialog.open(ViewDispatchModalComponent,{
      data: {
        dispatch: dispatch
      }
    });
  }

}
