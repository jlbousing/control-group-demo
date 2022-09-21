export class StorageManager {

  static setJSONToLocalStorage(key: string, value: any): void {

    const text: string = JSON.stringify(value);
    localStorage.setItem(key,text);
  }

  static getFromLocalStorage(key: string) {
    const value: string | null = localStorage.getItem(key)

    return value ? JSON.parse(value) : null;
  }

  static setStringValue(key: string, value: string) {
    localStorage.setItem(key,value);
  }

}
