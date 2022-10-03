import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/states/state.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IStateRequest } from 'src/app/interfaces/IStateRequest';
import { Dialog } from '@angular/cdk/dialog';
import { AlertModalComponent } from 'src/app/components/modals/alert-modal/alert-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/errorhandler/errorhandler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.scss']
})
export class CreateStateComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ])
  });


  constructor(
    private stateService: StateService,
    private dialog: Dialog,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onSubmit() {

    if(this.form.value.name) {

      const payload: IStateRequest = {
        name: this.form.value.name
      };

      this.stateService.createState(payload)
        .subscribe((response: any) => {

          this.dialog.open(AlertModalComponent,{
            data: {
              status: 201,
              message: <string>response.message.label
            }
          })
        },(error: HttpErrorResponse) => {
          this.errorHandler.handleError(error);
        });

        this.router.navigateByUrl("/places/state");
    }
  }

}
