import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'edit-categories-modal',
  templateUrl: './edit-categories-modal.component.html',
  styleUrls: ['./edit-categories-modal.component.scss']
})
export class EditCategoriesModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor(public dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }


}
