import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offsetTime',
  standalone: true
})
export class OffsetTimePipe implements PipeTransform {

  transform(value: Date): unknown {
    return value.toLocaleDateString("ru-RU");
  }

}
