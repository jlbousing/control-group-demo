import { Component, OnInit, Input } from '@angular/core';
import { IDispatch } from 'src/app/interfaces/IDispacht';
import { IProduction } from 'src/app/interfaces/IProduction';
import { Dialog } from '@angular/cdk/dialog';
import { EditDispatchModalComponent } from '../../modals/edit-dispatch-modal/edit-dispatch-modal.component';

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

}
