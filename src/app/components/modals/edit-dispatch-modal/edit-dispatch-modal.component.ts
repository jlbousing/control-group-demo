import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'edit-dispatch-modal',
  templateUrl: './edit-dispatch-modal.component.html',
  styleUrls: ['./edit-dispatch-modal.component.scss']
})
export class EditDispatchModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor(public dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }

}
