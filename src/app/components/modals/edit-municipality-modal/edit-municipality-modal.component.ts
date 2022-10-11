import { Component, Inject, OnInit } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IState } from 'src/app/interfaces/IState';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';
import { IMunicipalityRequest } from 'src/app/interfaces/IMunicipalityRequest';
import { MunicipalityService } from 'src/app/services/municipality/municipality.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface IDialogData {
  municipality: IMunicipality
  states: IState[],
  state: IState
}

@Component({
  selector: 'app-edit-municipality-modal',
  templateUrl: './edit-municipality-modal.component.html',
  styleUrls: ['./edit-municipality-modal.component.scss']
})
export class EditMunicipalityModalComponent implements OnInit {

  state: IState | null = null;

  form = new FormGroup({
    name: new FormControl<string>(this.data.municipality.name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    state: new FormControl<IState>(this.data.state,Validators.required)
  });

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    private router: Router,
    private municipalityService: MunicipalityService,
    public dialogRef: DialogRef,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  setState(value: any) {
    this.state = <IState>value;
    this.form.value.state = this.state;
  }

  onSubmit() {

    if(this.form.value.name
      && this.form.value.state) {

        const payload: IMunicipalityRequest = {
          name: this.form.value.name,
          statesId: this.form.value.state.id
        };

        this.municipalityService.patchMunicipality(payload,this.data.municipality.id)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent, {
              data: {
                status: 200,
                message: <string>response.label
              }
            });

            this.dialogRef.close();
            this.router.navigateByUrl("/dashboard/places/municipality");
          });
      }
  }

}
