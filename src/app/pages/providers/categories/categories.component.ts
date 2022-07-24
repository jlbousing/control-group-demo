import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  showModal: boolean = false;

  constructor() { }


  ngOnInit(): void {
  }

  showCreateModal() {
    this.showModal = true;
  }

  closeModal(msg: boolean){
    console.log("hey uya");
    this.showModal = false;
  }


}
