import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any,filterQuery: any, prop : any)  {
    
    if (value.length === 0) {
      return value;
    }

    let resultArray = [];

    for (const item of value) {
      if (filterQuery.includes(item[prop])) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }

}
