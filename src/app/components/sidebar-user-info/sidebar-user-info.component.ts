import { Component, OnInit } from '@angular/core';
import { StorageManager } from 'src/app/utils/StorageManager';

@Component({
  selector: 'sidebar-user-info',
  templateUrl: './sidebar-user-info.component.html',
  styleUrls: ['./sidebar-user-info.component.scss']
})
export class SidebarUserInfoComponent implements OnInit {

  name: string | null = null;
  id: number | null = null;

  constructor() { }

  ngOnInit(): void {
    let userInfo: any = StorageManager.getFromLocalStorage('userInfo');
    this.name = userInfo.name;
    this.id = userInfo.id;
  }

}
