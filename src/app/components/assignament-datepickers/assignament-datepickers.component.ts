import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IAssignamentPicker } from 'src/app/interfaces/IAssignamentPicker';
import moment from 'moment';

@Component({
  selector: 'assignament-datepickers',
  templateUrl: './assignament-datepickers.component.html',
  styleUrls: ['./assignament-datepickers.component.scss']
})
export class AssignamentDatepickersComponent implements OnInit {

  startDate: string | null = null;
  endDate: string | null = null;

  @Output() assignamentData = new EventEmitter<IAssignamentPicker>();


  constructor() { }

  ngOnInit(): void {
  }

  setStartDate(value: any) {

    let date = <string>value;

    this.startDate = moment(date).format("MM-DD-YYYY");

    console.log("fecha inicial ",this.startDate);

    if(this.startDate && this.endDate && this.startDate !== "" && this.endDate !== "") {

        const data: IAssignamentPicker = {
          startDate: this.startDate,
          endDate: this.endDate
        };

        this.assignamentData.emit(data);
      }
  }

  setEndDate(value: any) {

    let date = <string>value;

    this.endDate = moment(date).format("MM-DD-YYYY");

    console.log("fecha final ",this.endDate);

    if(this.startDate && this.endDate && this.startDate !== "" && this.endDate !== "") {

        const data: IAssignamentPicker = {
          startDate: this.startDate,
          endDate: this.endDate
        };

        this.assignamentData.emit(data);
      }

  }

}
