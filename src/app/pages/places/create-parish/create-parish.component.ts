import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IParishRequest } from 'src/app/interfaces/IParishRequest';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';
import { IState } from 'src/app/interfaces/IState';
import { StateService } from 'src/app/services/states/state.service';
import { MunicipalityService } from 'src/app/services/municipality/municipality.service';
import { ParishService } from 'src/app/services/parsih/parish.service';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';


@Component({
  selector: 'app-create-parish',
  templateUrl: './create-parish.component.html',
  styleUrls: ['./create-parish.component.scss']
})
export class CreateParishComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    state: new FormControl<IState | null>(null,Validators.required),
    municipality: new FormControl<IMunicipality | null>(null,Validators.required)
  });

  states: IState[] = [];
  municipalities: IMunicipality[] = [];

  state: IState | null = null;
  municipality: IMunicipality | null = null;

  loading: boolean = true;

  constructor(
    private stateService: StateService,
    private municipalityService: MunicipalityService,
    private parishService: ParishService,
    private router: Router,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.stateService.getStates(50,0)
      .subscribe((response: IState[]) => {
        this.states = response;
        this.loading = false;
      });
  }

  setState(value: any) {

    this.loading = true;
    this.state = <IState>value;

    this.municipalityService.getMunicipality(50,0,this.state.id)
      .subscribe((response: IMunicipality[]) => {
        this.municipalities = response;
        console.log("probando municipios ",this.municipalities);
        this.loading = false;
      });
  }

  setMunicipality(value: any) {
    this.municipality = <IMunicipality>value;
    this.form.value.municipality = this.municipality;
  }

  onSubmit() {

    if(this.form.value.name
      && this.form.value.municipality) {

        const payload: IParishRequest = {
          name: this.form.value.name,
          municipalityId: this.form.value.municipality.id
        }

        this.parishService.createParish(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent, {
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/places/parish");
          });
      }
  }

}
