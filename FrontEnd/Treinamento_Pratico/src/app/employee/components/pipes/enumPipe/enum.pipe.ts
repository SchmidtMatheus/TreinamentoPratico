import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enum'
})
export class EnumPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    if(!value){
      return null;
    }

    let values = value.split('_');
    let result = '';


    for(let v of values){
      result += this.capitalize(v) + ' ';
    }

    return result;
  }

  private capitalize(value: string){
    return value.substring(0,1).toUpperCase() + value.substring(1).toLowerCase();
  }

}

