import { Injectable } from '@angular/core';
import { ListService } from './list.service';
import { IPare } from '../models/IPare';
import { addDays, format, startOfWeek, subDays } from 'date-fns';
import { BehaviorSubject, Subject } from 'rxjs';



@Injectable()
export class DataStorageService {

  list: IPare[] = []

  constructor(
    private LService: ListService,
  ){

    this.tempDate = startOfWeek(this.tempDate, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      this.date[i] = new Date(this.tempDate);
      this.tempDate = addDays(this.tempDate,1);
    }

    this.LService.getPares(format(this.date[0], "yyyy-MM-dd"), format(this.date[6], "yyyy-MM-dd")).subscribe(response=>{
      this.list = response
      this.$list = new BehaviorSubject<IPare[]>(this.list)
      this.checkWarning()
    })
  }

  /*
    Реализация для уведомления
  */
    $message = new Subject<string>();

  
  /*
    Управление датой date
  */
 
  tempDate:Date = new Date() //Текущая дата для захвата диапазона(недели)
  date: Date[] = []
  //Переключение даты на неделю вперед
  nextWeek(): Date[] {
    for (let i = 0; i < 7; i++) {
      this.date[i] = new Date(this.tempDate);
      this.tempDate = addDays(this.tempDate,1);
    }
    this.LService.getPares(format(this.date[0], "yyyy-MM-dd"), format(this.date[6], "yyyy-MM-dd")).subscribe(response=>{
      this.list = response
      this.checkWarning()
      this.$list.next(this.list)
    })
    return this.date
  }
  //Переключение даты на неделю назад
  previousWeek(): Date[] {
    this.tempDate = subDays(new Date(this.tempDate), 14);
    for (let i = 0; i < 7; i++) {
      this.date[i] = new Date(this.tempDate);
      this.tempDate = addDays(this.tempDate,1);
    }
    this.LService.getPares(format(this.date[0], "yyyy-MM-dd"), format(this.date[6], "yyyy-MM-dd")).subscribe(response=>{
      this.list = response
      this.checkWarning()
      this.$list.next(this.list)
    })
    return this.date
  }


  /*
    Управление расписанием
  */

  $list = new BehaviorSubject<IPare[]>(this.list);

  uploadPares(pares: IPare[]){
    let temp: IPare[] = []
    pares.forEach(el=>{
      if(el.classroom_id != 0 && el.discipline_id != 0 && el.teacher_id != 0) temp.push(el)
    })
    this.LService.uploadPares(temp, format(this.date[0],"yyyy-MM-dd"), format(this.date[6],"yyyy-MM-dd")).subscribe(response => {
      this.list = response
      this.checkWarning()
      this.$list.next(this.list)
      this.$message.next("Пары на "+ format(this.date[0],"dd.MM.yyyy") +" - " + format(this.date[6],"dd.MM.yyyy") + " сохранены")
    })
  }

  /*
    Выявление ошибок в расписании
  */

  warning: IPare[] = []
  checkWarning(){
    this.warning = []
    this.list.forEach(element1 => {
      this.list.forEach(element2 =>{
        if(element1 != element2 && element1.date == element2.date && element1.teacher_id == element2.teacher_id && element1.number == element2.number ||
          element1 != element2 && element1.date == element2.date && element1.classroom_id == element2.classroom_id && element1.number == element2.number
        ){
          this.warning.push(element1);
        }
      });
    });
  }

  getWarningByGroupIdAndDate(group_id: number, date: Date): IPare[] {
    let temp: IPare[] = []
    this.warning.forEach(el=>{
      if(el.date == format(date, "yyyy-MM-dd") && el.group_id == group_id) temp.push(el);
    })
    return temp
  }

}
