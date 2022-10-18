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
import { DomSanitizer } from '@angular/platform-browser';

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

  files: any = []
  imagenPrevia: any;

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
    private errorHandler: ErrorHandlerService,
    private sanitizer: DomSanitizer
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

  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  onFileSelected(event: any) {

    const imagen = event.target.files[0];
    console.log(imagen);
    let text = 'image/'
    if (imagen.type.includes(text)) {
      console.log('Si es una imagen');
      this.files.push(imagen)
      this.blobFile(imagen).then((res: any) => {
        this.imagenPrevia = res.base;

      })
    } else {
      console.log('No es imagen');

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
      && this.form.value.registrationNumber
      && this.files) {

        const userInfo: any = StorageManager.getFromLocalStorage('userInfo');

        const payload: IDispatchRequest = {
          guideNumber: this.form.value.guideNumber,
          noteNumber: this.form.value.noteNumber,
          productionId: this.productionId,
          destination: this.destination,
          dispatchQuantity: this.form.value.dispatchQuantity,
          userId: <number> userInfo.id,
          partial: true,
          onHold: this.form.value.onHold,
          comments: this.form.value.comments,
          incidents: this.form.value.incidents,
          registrationNumber: this.form.value.registrationNumber,
          image: this.files
        };

        console.log(payload);

        const formData = new FormData();
        formData.append("guideNumber",payload.guideNumber.toString());
        formData.append("noteNumber",payload.noteNumber.toString());
        formData.append("productionId",payload.productionId.toString());
        formData.append("destination",payload.destination.toString());
        formData.append("dispatchQuantity",payload.dispatchQuantity.toString());
        formData.append("userId",payload.userId.toString());
        formData.append("partial",payload.partial.toString());
        formData.append("onHold",payload.onHold.toString());
        formData.append("comments",payload.comments.toString());
        formData.append("incidents",payload.incidents.toString());
        formData.append("registrationNumber",payload.registrationNumber);
        formData.append("image",this.files[0]);


        this.dispatchService.createProduction(formData)
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
