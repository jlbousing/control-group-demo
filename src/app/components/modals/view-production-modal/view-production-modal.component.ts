import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'view-production-modal',
  templateUrl: './view-production-modal.component.html',
  styleUrls: ['./view-production-modal.component.scss']
})
export class ViewProductionModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor(public dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }

}
