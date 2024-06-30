import { Pipe, PipeTransform } from '@angular/core';
import { format, getDay } from 'date-fns';

@Pipe({
  name: 'weekday',
  standalone: true
})
export class WeekdayPipe implements PipeTransform {

  transform(value: Date): string {
    const day = getDay(value);
    if(day == 1) return "Понедельник "+ format(value,"dd.MM.yyyy");
    else if(day == 2) return "Вторник " + format(value,"dd.MM.yyyy");
    else if(day == 3) return "Среда " + format(value,"dd.MM.yyyy");
    else if(day == 4) return "Четверг " + format(value,"dd.MM.yyyy");
    else if(day == 5) return "Пятница " + format(value,"dd.MM.yyyy");
    else if(day == 6) return "Суббота " + format(value,"dd.MM.yyyy");
    else if(day == 0) return "Воскресенье " + format(value,"dd.MM.yyyy");
    else  return "Неизвестно";
  }

}
