import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'create-dispatch-modal',
  templateUrl: './create-dispatch-modal.component.html',
  styleUrls: ['./create-dispatch-modal.component.scss']
})
export class CreateDispatchModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }


}
