import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'create-instructions-modal',
  templateUrl: './create-instructions-modal.component.html',
  styleUrls: ['./create-instructions-modal.component.scss']
})
export class CreateInstructionsModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }

}
