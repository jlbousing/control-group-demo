import { IStatus } from "../interfaces/IStatus";
import { StorageManager } from "../utils/StorageManager";

export class StoreGlobalInformation {

  static storeStatues(statues: IStatus) {
    StorageManager.setJSONToLocalStorage("statues",statues);
  }

}
