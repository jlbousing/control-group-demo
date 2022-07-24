import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'create-assignments-modal',
  templateUrl: './create-assignments-modal.component.html',
  styleUrls: ['./create-assignments-modal.component.scss']
})
export class CreateAssignmentsModalComponent implements OnInit {

  @Input('showModal') showModal: boolean = false;
  @Output() emiterModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal(){
    this.emiterModal.emit(true);
  }


}
