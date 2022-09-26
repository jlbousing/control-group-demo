import { Component, OnInit } from '@angular/core';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';
import { IState } from 'src/app/interfaces/IState';
import { StateService } from 'src/app/services/states/state.service';
import { MunicipalityService } from 'src/app/services/municipality/municipality.service';
import { ParishService } from 'src/app/services/parsih/parish.service';
import { IParish } from 'src/app/interfaces/IParish';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-parish',
  templateUrl: './parish.component.html',
  styleUrls: ['./parish.component.scss']
})
export class ParishComponent implements OnInit {

  states: IState[] = [];
  state: IState | null = null;

  municipalities: IMunicipality[] = [];
  municipality: IMunicipality | null = null;

  parishs: IParish[] = [];

  loading: boolean = true;

  constructor(
    private stateService: StateService,
    private muncipalityService: MunicipalityService,
    private parishService: ParishService,
    private dialog: Dialog
  ) { }

  ngOnInit(): void {

    this.stateService.getStates(50,0)
      .subscribe((response: IState[]) => {
        this.states = response
        this.loading = false;
      });
  }

  setState(value: any) {

    this.loading = true;
    this.state = <IState>value;

    this.muncipalityService.getMunicipality(50,0,this.state.id)
      .subscribe((response: IMunicipality[]) => {
        this.municipalities = response;
        this.loading = false;
      });
  }

  setMunicipality(value: any) {

    this.loading = true;
    this.municipality = <IMunicipality>value;

    this.parishService.getParish(50,0,this.municipality.id)
      .subscribe((response: IParish[]) => {
        this.parishs = response;
        this.loading = false;
      });
  }

}
