import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductionService } from 'src/app/services/production/production.service';
import { DispachtService } from 'src/app/services/dispatch/dispacht.service';
import { IProduction } from 'src/app/interfaces/IProduction';
import { IDispatchRequest } from 'src/app/interfaces/IDispatchRequest';
import { StorageManager } from 'src/app/utils/StorageManager';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { StateService } from 'src/app/services/states/state.service';
import { MunicipalityService } from 'src/app/services/municipality/municipality.service';
import { ParishService } from 'src/app/services/parsih/parish.service';
import { Router } from '@angular/router';
import { IState } from 'src/app/interfaces/IState';
import { IMunicipality } from 'src/app/interfaces/IMunicipality';
import { IParish } from 'src/app/interfaces/IParish';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';

@Component({
  selector: 'app-create-dispatch',
  templateUrl: './create-dispatch.component.html',
  styleUrls: ['./create-dispatch.component.scss']
})
export class CreateDispatchComponent implements OnInit {

  supplierId: number = 0;
  productionId: number = 0;

  production: IProduction | null = null;

  states: IState[] = [];
  state: IState | null = null;

  municipalities: IMunicipality[] = [];
  municipality: IMunicipality | null = null;

  parishes: IParish[] = [];
  parish: IParish | null = null;

  loading: boolean = true;

  destination: string | null = null;

  form = new FormGroup({
    guideNumber: new FormControl<string>('',Validators.required),
    noteNumber: new FormControl<string>('',Validators.required),
    //destination: new FormControl<string>('',Validators.required),
    dispatchQuantity: new FormControl<number>(0,[
      Validators.required,
      Validators.min(1),
    ]),
    onHold: new FormControl<boolean>(false,Validators.required),
    state: new FormControl<IState | null>(null),
    municipality: new FormControl<IMunicipality | null>(null),
    parish: new FormControl<ParishService | null>(null),
    comments: new FormControl<string>('',[
      Validators.maxLength(250)
    ]),
    incidents: new FormControl<string>('',[
      Validators.maxLength(250)
    ]),
    registrationNumber: new FormControl<string>('',Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private productionService: ProductionService,
    private dispatchService: DispachtService,
    private dialog: Dialog,
    private router: Router,
    private stateService: StateService,
    private municipalityService: MunicipalityService,
    private parishService: ParishService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.stateService.getStates(50,0)
      .subscribe((response: IState[]) => {
        this.states = response;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.route.params.subscribe(params => {
      this.supplierId = params["supplierId"];
      this.productionId = params["productionId"];

      this.productionService.findProduction(this.productionId)
        .subscribe((production: IProduction) => {
          this.production = production;

          this.form.get("dispatchQuantity")?.addValidators(Validators.max(this.production.stockProduction))
          this.loading = false;
        })

    })
  }

  setState(value: any) {

    this.destination = "";

    this.loading = true;
    this.state = <IState>value;

    if(this.state) {
      this.destination = this.state.name;
    }

    this.municipalityService.getMunicipality(50,0,this.state.id)
      .subscribe((response: IMunicipality[]) => {
        this.municipalities = response;
        console.log("mostrando estados ",this.municipality);
        this.loading = false;
      },(error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        this.loading = false;
      });
  }

  setMunicipality(value: any) {

    this.loading = true;
    this.destination = "";
    this.municipality = <IMunicipality>value;

    console.log(this.municipality);

    if(this.state && this.municipality) {
      this.destination = this.state.name + ', ' + this.municipality.name;
    }

    this.parishService.getParish(50,0,this.municipality.id)
      .subscribe((response: IParish[]) => {
        this.parishes = response;
        this.loading = false;
      });
  }

  setParish(value: any) {

    this.destination = "";
    this.parish = <IParish>value;

    if(this.state && this.municipality && this.parish) {
      this.destination = this.state.name + ', ' + this.municipality.name + ', ' + this.parish.name;
    }
  }

  onSubmit() {

    console.log(this.form.value);
    console.log(this.destination);

    if(this.form.value.guideNumber
      && this.form.value.noteNumber
      //&& this.form.value.destination
      && this.destination
      && this.form.value.dispatchQuantity
      && this.form.value.comments !== undefined
      && this.form.value.comments !== null
      && this.form.value.onHold !== undefined
      && this.form.value.onHold !== null
      && this.form.value.incidents !== undefined
      && this.form.value.incidents !== null
      && this.form.value.registrationNumber) {

        const userInfo: any = StorageManager.getFromLocalStorage('userInfo');

        const payload: IDispatchRequest = {
          guideNumber: this.form.value.guideNumber,
          noteNumber: this.form.value.noteNumber,
          productionId: this.productionId,
          //destination: this.form.value.destination,
          destination: this.destination,
          dispatchQuantity: this.form.value.dispatchQuantity,
          userId: <number> userInfo.id,
          partial: true,
          onHold: this.form.value.onHold,
          comments: this.form.value.comments,
          incidents: this.form.value.incidents,
          registrationNumber: this.form.value.registrationNumber
        };

        console.log(payload);


        this.dispatchService.createProduction(payload)
          .subscribe((response: any) => {

            this.dialog.open(AlertModalComponent,{
              data: {
                status: 201,
                message: <string>response.message.label
              }
            });

            this.router.navigateByUrl("/providers/dispatch/"+this.supplierId);
          },(error: HttpErrorResponse) => {
            this.errorHandler.handleError(error)
          })

      }else {
        console.log(this.form.value.comments ? true : false)
        console.log(this.form.value.incidents ? true : false)
      }
  }

}
