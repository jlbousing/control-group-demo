import { Component, OnInit } from '@angular/core';
import { StatusService } from './services/status/status.service';
import { StoreGlobalInformation } from './global/StoreGlobalInformation';
import { IStatus } from './interfaces/IStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'control-group-admin';

  constructor(
    private statusServices: StatusService
  ) {}

  ngOnInit(): void {
    /*this.statusServices.getStatues(50,0).subscribe((response: IStatus) => {
      console.log(response);
      //StoreGlobalInformation.storeStatues(response)
    }) */
  }


}
