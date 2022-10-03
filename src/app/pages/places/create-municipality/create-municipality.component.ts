import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMunicipalityRequest } from 'src/app/interfaces/IMunicipalityRequest';
import { IState } from 'src/app/interfaces/IState';
import { StateService } from 'src/app/services/states/state.service';
import { MunicipalityService } from 'src/app/services/municipality/municipality.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-create-municipality',
  templateUrl: './create-municipality.component.html',
  styleUrls: ['./create-municipality.component.scss']
})
export class CreateMunicipalityComponent implements OnInit {

  loading: boolean = true;

  states: IState[] = [];
  state: IState | null = null;

  form = new FormGroup({
    name: new FormControl<string>("",[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    state: new FormControl<IState | null>(null,Validators.required)
  });

  constructor(
    private stateService: StateService,
    private municipalityService: MunicipalityService,
    private router: Router,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.stateService.getStates(50,0)
      .subscribe((response: IState[]) => {
        this.states = response;
        this.loading = false;
      })
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

        this.municipalityService.createMunicipality(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/places/municipality");
          });
      }
  }

}
