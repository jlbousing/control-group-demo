export function iterateJson(object: any): any {

  let message = ""

  for(let key in object){
      //console.log(`${key} valor: ${JSON.stringify(object[key])}`);'
      if(key == 'errors'){
          for(let i in object[key]){
              //console.log(`${i} valor: ${JSON.stringify(object[key][i])}`);
              message = message + `\n ${object[key][i]}`;
          }
      }
  }

  return message;
}
