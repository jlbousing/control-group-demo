import { IStatus } from "../interfaces/IStatus";
import { StorageManager } from "../utils/StorageManager";

export class StoreGlobalInformation {

  static storeStatues(statues: IStatus) {
    StorageManager.setJSONToLocalStorage("statues",statues);
  }

  static storeJWT(jwt: string) {
    StorageManager.setStringValue('token',jwt);
  }

}
