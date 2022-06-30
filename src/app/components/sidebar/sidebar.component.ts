import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isOpen: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  buttonSideMenu(): void {
    this.isOpen = !this.isOpen;
  }

}
