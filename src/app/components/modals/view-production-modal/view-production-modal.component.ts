import { Component, Inject, OnInit } from '@angular/core';
import { IProduction } from 'src/app/interfaces/IProduction';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ProductionService } from 'src/app/services/production/production.service';
import { HttpErrorResponse } from '@angular/common/http';

interface IDialogData {
  production: IProduction
}

@Component({
  selector: 'view-production-modal',
  templateUrl: './view-production-modal.component.html',
  styleUrls: ['./view-production-modal.component.scss']
})
export class ViewProductionModalComponent implements OnInit {

  assignamentDate: string = "";
  img: HTMLElement | null = null;

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private productionService: ProductionService
  ) { }

  ngOnInit(): void {

    this.img = document.getElementById("img");

    console.log("view production ",this.data);
    this.data.production.createdDate.split("T")[0];

    this.productionService.getImage(this.data.production.image)
      .subscribe((response: any) => {

        var reader = new FileReader();
        reader.readAsDataURL(response)
        reader.onloadend = function() {
        var base64data = reader.result?.toString();
        console.log(base64data);
        document.getElementById("img")?.setAttribute("src",base64data!.toString());
        }
      },(error: HttpErrorResponse) => {
          console.log(error);
      });
  }

  colorStatus() {
    return statusNameColor(this.data.production.statusData.status);
  }

  onCloseModal(){
    this.dialogRef.close();
  }

}
