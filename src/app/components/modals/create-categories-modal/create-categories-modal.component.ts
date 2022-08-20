import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'create-categories-modal',
  templateUrl: './create-categories-modal.component.html',
  styleUrls: ['./create-categories-modal.component.scss']
})
export class CreateCategoriesModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor(public dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }


}
