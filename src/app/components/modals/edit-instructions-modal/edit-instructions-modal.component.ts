import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edit-instructions-modal',
  templateUrl: './edit-instructions-modal.component.html',
  styleUrls: ['./edit-instructions-modal.component.scss']
})
export class EditInstructionsModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }

}
