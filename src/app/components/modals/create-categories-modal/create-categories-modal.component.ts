import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'create-categories-modal',
  templateUrl: './create-categories-modal.component.html',
  styleUrls: ['./create-categories-modal.component.scss']
})
export class CreateCategoriesModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }


}
