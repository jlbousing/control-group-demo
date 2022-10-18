import { Component, Inject, OnInit } from '@angular/core';
import { IDispatch } from 'src/app/interfaces/IDispacht';
import { statusNameColor } from 'src/app/utils/statusNameColor';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DispachtService } from 'src/app/services/dispatch/dispacht.service';

interface IDialogData {
  dispatch: IDispatch
}

@Component({
  selector: 'app-view-dispatch-modal',
  templateUrl: './view-dispatch-modal.component.html',
  styleUrls: ['./view-dispatch-modal.component.scss']
})
export class ViewDispatchModalComponent implements OnInit {

  img: HTMLElement | null = null;

  constructor(
    @Inject(DIALOG_DATA) public data: IDialogData,
    public dialogRef: DialogRef,
    private dispatchService: DispachtService
  ) { }

  ngOnInit(): void {

    this.dispatchService.getImage(this.data.dispatch.image)
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
    return statusNameColor(this.data.dispatch.statusData.status);
  }

  onCloseModal(){
    this.dialogRef.close();
  }

}
