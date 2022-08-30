import { StorageManager } from "../utils/StorageManager";
import { environment } from "src/environments/environment";

export const headers = {
  'Authorization': `Bearer ${StorageManager.getFromLocalStorage('token')}`,
  'apikey': `${environment.apikey}`
};
