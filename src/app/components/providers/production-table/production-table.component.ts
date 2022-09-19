import { Component, OnInit, Input, INJECTOR } from '@angular/core';
import { IProduction } from 'src/app/interfaces/IProduction';
import { IRecipe } from 'src/app/interfaces/IRecipe';
import { IAssignament } from 'src/app/interfaces/IAssignament';
import { Dialog } from '@angular/cdk/dialog';
import { ViewProductionModalComponent } from '../../modals/view-production-modal/view-production-modal.component';
import { RemakeProductionModalComponent } from '../../modals/remake-production-modal/remake-production-modal.component';

@Component({
  selector: 'production-table',
  templateUrl: './production-table.component.html',
  styleUrls: ['./production-table.component.scss']
})
export class ProductionTableComponent implements OnInit {

  @Input("productions") productions: IProduction[] = [];
  @Input("recipe") recipe: IRecipe | null = null;
  @Input("assignament") assignament: IAssignament | null = null;
  @Input("supplierId") supplierId: number = 0;

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {
  }

  selectView(production: IProduction){
    this.dialog.open(ViewProductionModalComponent,{
      data: {
        production: production
      }
    });
  }

  selectRemake(production: IProduction){
    this.dialog.open(RemakeProductionModalComponent,{
      data: {
        production: production
      }
    });
  }

}
