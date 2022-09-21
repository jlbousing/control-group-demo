import { Component, OnInit } from '@angular/core';
import { StorageManager } from './utils/StorageManager';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'control-group-admin';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const userInfo = StorageManager.getFromLocalStorage("userInfo");

    if(userInfo){
      this.router.navigateByUrl("/home");
    }else{
      this.router.navigateByUrl("/login");
    }
  }


}
