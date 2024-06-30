import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'dateUnix',
  standalone: true
})
export class DateUnixPipe implements PipeTransform {

  transform(value: number | string): string{
    return format(new Date(value),"yyyy-MM-dd");
  }

}
