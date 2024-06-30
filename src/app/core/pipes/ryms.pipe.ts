import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ryms',
  standalone: true
})
export class RymsPipe implements PipeTransform {

  transform(value:number): string {
    if(value == 1) return "I";
    if(value == 2) return "II";
    else return "0";
  }

}
