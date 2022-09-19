import { Component, OnInit, Inject } from '@angular/core';
import { IProduction } from 'src/app/interfaces/IProduction';
import { ProductionService } from 'src/app/services/production/production.service';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

interface IDialogData {
  production: IProduction
}

@Component({
  selector: 'app-remake-production-modal',
  templateUrl: './remake-production-modal.component.html',
  styleUrls: ['./remake-production-modal.component.scss']
})
export class RemakeProductionModalComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private productionService: ProductionService
  ) { }

  ngOnInit(): void {
  }

  revert(id: number) {

    this.productionService.revertProduction(id)
      .subscribe((response: any) => {
        console.log(response);
        alert(response.label);
      })

  }

}
