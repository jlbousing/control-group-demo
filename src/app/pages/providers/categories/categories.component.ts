import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  showModalCreate: boolean = false;
  showModalEdit: boolean = false;

  constructor() { }


  ngOnInit(): void {
  }

  showCreateModal() {
    this.showModalCreate = true;
  }

  closeModalCreate(msg: boolean){
    console.log("hey uya");
    this.showModalCreate = false;
  }

  showEditModal(obj: any) {
    this.showModalEdit = true;
  }

  closeModalEdit(msg: boolean){
    console.log("hey uya");
    this.showModalEdit = false;
  }


}
