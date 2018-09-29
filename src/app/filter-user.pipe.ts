import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser',
  pure: false
})

export class FilterUserPipe implements PipeTransform {

  transform(value: any, filteredString: string): any {
    if (value.length == 0){
      return value;
    }
    const resultArray = [];
    for (const i of value){
      if (i['description'].includes(filteredString) || i['iduds006']['description'].includes(filteredString)){
        resultArray.push(i);        
      }
    }
    return resultArray;    
  }

}
