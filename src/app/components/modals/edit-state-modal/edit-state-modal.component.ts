import { Component, OnInit, Inject } from '@angular/core';
import { StateService } from 'src/app/services/states/state.service';
import { IStateRequest } from 'src/app/interfaces/IStateRequest';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IState } from 'src/app/interfaces/IState';

interface IDialogData {
  state: IState
}

@Component({
  selector: 'edit-state-modal',
  templateUrl: './edit-state-modal.component.html',
  styleUrls: ['./edit-state-modal.component.scss']
})
export class EditStateModalComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>(this.data.state.name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ])
  });
  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    private stateService: StateService,
    private dialog: Dialog,
    public dialogRef: DialogRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onSubmit() {

    if(this.form.value.name) {

      const payload: IStateRequest = {
        name: this.form.value.name
      };

      this.stateService.patchState(payload,this.data.state.id)
        .subscribe((response: any) => {
          this.dialog.open(AlertModalComponent,{
            data: {
              status: 200,
              message: <string>response.label
            }
          });
        })

        this.dialogRef.close();
        this.router.navigateByUrl("/dashboard/places/state");
    }
  }

}
