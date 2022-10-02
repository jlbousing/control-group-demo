import { Injectable } from '@angular/core';
import { StorageManager } from 'src/app/utils/StorageManager';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  rol: number = 0;
  constructor() {
    this.rol = StorageManager.getFromLocalStorage("userInfo").rol;
   }

  canCreate() :boolean {

    switch(this.rol) {
      case 1:
        return true;
        break;
      case 2:
        return true;
        break;
      case 3:
        return true;
        break;
      default:
        return false;
    }
  }
}
