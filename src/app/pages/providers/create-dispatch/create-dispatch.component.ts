import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductionService } from 'src/app/services/production/production.service';
import { DispachtService } from 'src/app/services/dispatch/dispacht.service';
import { IProduction } from 'src/app/interfaces/IProduction';
import { IDispatchRequest } from 'src/app/interfaces/IDispatchRequest';
import { StorageManager } from 'src/app/utils/StorageManager';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-dispatch',
  templateUrl: './create-dispatch.component.html',
  styleUrls: ['./create-dispatch.component.scss']
})
export class CreateDispatchComponent implements OnInit {

  supplierId: number = 0;
  productionId: number = 0;

  production: IProduction | null = null;

  loading: boolean = true;

  form = new FormGroup({
    guideNumber: new FormControl<string>('',Validators.required),
    noteNumber: new FormControl<string>('',Validators.required),
    destination: new FormControl<string>('',Validators.required),
    dispatchQuantity: new FormControl<number>(0,Validators.required),
    onHold: new FormControl<boolean>(false,Validators.required),
    comments: new FormControl<string>('',Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private productionService: ProductionService,
    private dispatchService: DispachtService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.supplierId = params["supplierId"];
      this.productionId = params["productionId"];

      this.productionService.findProduction(this.productionId)
        .subscribe((production: IProduction) => {
          this.production = production;
          this.loading = false;
        })

    })
  }

  onSubmit() {

    console.log(this.form.value);

    if(this.form.value.guideNumber
      && this.form.value.noteNumber
      && this.form.value.destination
      && this.form.value.dispatchQuantity
      && this.form.value.comments
      && this.form.value.onHold !== undefined
      && this.form.value.onHold !== null) {

        const userInfo: any = StorageManager.getFromLocalStorage('userInfo');

        const payload: IDispatchRequest = {
          guideNumber: this.form.value.guideNumber,
          noteNumber: this.form.value.noteNumber,
          productionId: this.productionId,
          destination: this.form.value.destination,
          dispatchQuantity: this.form.value.dispatchQuantity,
          userId: <number> userInfo.id,
          partial: true,
          onHold: this.form.value.onHold,
          comments: this.form.value.comments
        };

        console.log(payload);


        this.dispatchService.createProduction(payload)
          .subscribe((response: any) => {
            alert(response.message.label);
          })

      }
  }

}
