import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'create-production-modal',
  templateUrl: './create-production-modal.component.html',
  styleUrls: ['./create-production-modal.component.scss']
})
export class CreateProductionModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor(public dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }

}
