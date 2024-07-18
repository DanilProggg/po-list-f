import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../../core/services/list.service';
import { IPare } from '../../../core/models/IPare';
import { CommonModule } from '@angular/common';
import { WeekdayPipe } from '../../../core/pipes/weekday.pipe';
import { addDays, format } from 'date-fns';
import { IDiscipline } from '../../../core/models/IDiscipline';
import { ITeacher } from '../../../core/models/ITeacher';
import { IClassroom } from '../../../core/models/IClassroom';
import { RymsPipe } from '../../../core/pipes/ryms.pipe';
import { IGroup } from '../../../core/models/IGroup';
import { elementAt } from 'rxjs';
import { ar } from 'date-fns/locale';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, WeekdayPipe, RymsPipe],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{

  disciplines: IDiscipline[] = []
  teachers: ITeacher[] = []
  classroom: IClassroom[] = []

  _pares: IPare[] = []
  group_name = ""

  //0-сегодня, 1-завтра, 2-послезавтра
  dates = [new Date(), addDays(new Date(),1 ), addDays(new Date(), 2)]
  constructor(private route: ActivatedRoute, private LService: ListService){}


  ngOnInit():void{
    console.log(this.sortByDate(this._pares,0,1))

    //Получение Id группы из пути в запросе
    const id = this.route.snapshot.paramMap.get('id');

    //Получение текущего расписания
    this.LService.getListByGroup(Number(id), format(this.dates[0],"yyyy-MM-dd"), format(this.dates[2],"yyyy-MM-dd")).subscribe(response=>{
      this._pares = response
      console.log(this._pares)
    });

    this.LService.getClassrooms().subscribe(response => {
      this.classroom = response
    })

    this.LService.getDisciplines().subscribe(response => {
      this.disciplines = response
    })

    this.LService.getTeachers().subscribe(response => {
      this.teachers = response
    })

    this.LService.getGroups().subscribe(response => {
      let groups: IGroup[] = response
      groups.forEach(element=>{
        if(element.id == Number(id)) this.group_name = element.name.toString()
      })
    })
  }

  sortByDate(array: IPare[], date: number, subgroup: number) : IPare[]{
    return array.filter(pare => pare.date == format(this.dates[date],"yyyy-MM-dd"))
  }

  getDisciplineName(value: number): string{
    let name = ""
    this.disciplines.forEach(element => {
      if(element.id == value) name = element.name;
    });
    return name;
  }
  
  getTeacherName(value: number): string{
    let name = ""
    this.teachers.forEach(element=>{
      if(element.id == value) name = element.name;
    });
    return name;
  }

  getClassroomNumber(value: number): string{
    let number = ""
    this.classroom.forEach(element=>{
      if(element.id == value) number = element.number;
    });
    return number;
  }

  secondGroupIsPresent(date: Date){
    let bool = false
    this._pares.forEach(element=>{
      if(element.sub == true && element.date == format(date,"yyyy-MM-dd")) bool = true
    })
    return bool
  }

  getFirstSub(date: Date): IPare[] {
    let temp: IPare[] = []
    this._pares.forEach(element=>{
      if(element.subgroup == 1 && element.date == format(date, "yyyy-MM-dd")) temp.push(element)
    })
    return temp
  }

  getSecondSub(date: Date): IPare[] {
    let temp: IPare[] = []
    this._pares.forEach(element=>{
      if(element.subgroup == 2 && element.date == format(date, "yyyy-MM-dd")) temp.push(element)
    })
    return temp
  }
}
