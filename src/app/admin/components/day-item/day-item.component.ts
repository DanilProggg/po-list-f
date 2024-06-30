import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { IGroup } from '../../../core/models/IGroup';
import { IDiscipline } from '../../../core/models/IDiscipline';
import { ITeacher } from '../../../core/models/ITeacher';
import { IClassroom } from '../../../core/models/IClassroom';
import { CommonModule } from '@angular/common';
import { IPare } from '../../../core/models/IPare';
import { DataStorageService } from '../../../core/services/data-storage.service';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';
import { ModalService } from '../../../core/services/modal.service';
import { IModal } from '../../../core/models/IModal';

@Component({
  selector: 'app-day-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './day-item.component.html',
  styleUrl: './day-item.component.css'
})
export class DayItemComponent implements OnInit, OnChanges{


  @Output() saveDay = new EventEmitter<IPare[]>

  @Input() date: Date
  @Input() group: IGroup

  @Input() disciplines: IDiscipline[]
  @Input() teachers: ITeacher[]
  @Input() classrooms: IClassroom[]

  //Функция для прослушивания нажатия кнопки сахранения
  private buttonClickListener?: () => void;


  constructor(
    private storage: DataStorageService,
    private renderer: Renderer2,
    private modalService: ModalService
  ){}

  //@Output() editPare = new EventEmitter<IPare[]>

  second_group: boolean[] = []

  //Данные первой подгруппы
  sub1_discipline_map = new Map()
  sub1_teacher_map = new Map()
  sub1_classroom_map = new Map()

  sub_status_map = new Map()
  //Словарь для хранения стилей
  sub1_style_map = new Map<number, Record<string, string>>()

  //Данные второй подгруппы
  sub2_discipline_map = new Map()
  sub2_teacher_map = new Map()
  sub2_classroom_map = new Map()
  //Словарь для хранения стилей
  sub2_style_map = new Map<number, Record<string, string>>()


  
  ngOnInit(): void {

    this.buttonClickListener = this.renderer.listen(
      document.getElementById("save_button"),
      'click',
      (event) => this.loadToParentComponent()
    );

    

    //Подписка на список пар
    this.storage.$list.subscribe(response=>{
      
      //Заполнение списков пустыми знаяениями (Пар нет)
    for(let i = 0; i <= 6; i++){
      this.sub1_discipline_map.set(i, 0)
      this.sub1_teacher_map.set(i, 0)
      this.sub1_classroom_map.set(i, 0)
      this.sub_status_map.set(i, false)
      this.sub2_discipline_map.set(i, 0)
      this.sub2_teacher_map.set(i, 0)
      this.sub2_classroom_map.set(i, 0)
    }

      response.forEach(element=>{
        if(element.group_id == this.group.id && element.date == format(this.date, "yyyy-MM-dd")) {
          for(let i = 1; i <= 6; i++){
            if(element.number == i && element.subgroup == 1){
              this.sub1_discipline_map.set(i, element.discipline_id)
              this.sub1_teacher_map.set(i, element.teacher_id)
              this.sub1_classroom_map.set(i, element.classroom_id)
              if(element.sub == true) this.sub_status_map.set(i, true)
            }
            if(element.number == i && element.subgroup == 2){
              this.sub2_discipline_map.set(i, element.discipline_id)
              this.sub2_teacher_map.set(i, element.teacher_id)
              this.sub2_classroom_map.set(i, element.classroom_id)
            }
          }
        }
      })

      //Очистка пар предупрждением
      for(let i = 1; i <= 6; i++){
        this.sub1_style_map.set(i, {'background':'none'})
        this.sub2_style_map.set(i, {'background':'none'})
      }
      //Заполнение пар с предупреждением
      this.storage.getWarningByGroupIdAndDate(this.group.id, this.date).forEach(el=>{
        for(let i = 1; i <= 6; i++){
          if(el.number == i && el.subgroup == 1) {
            this.sub1_style_map.set(i, {'background':'yellow'})
          }
          if(el.number == i && el.subgroup == 2) {
            this.sub2_style_map.set(i, {'background':'yellow'})
          }
        }
      })
    })
  }
  //NgInit END

  ngOnChanges(changes: SimpleChanges): void {   
    //Заполнение пар с предупреждением
    this.storage.getWarningByGroupIdAndDate(this.group.id, this.date).forEach(el=>{
      for(let i = 1; i <= 6; i++){
        if(el.number == i && el.subgroup == 1) this.sub1_style_map.set(i, {'background':'yellow'});
        if(el.number == i && el.subgroup == 2) this.sub2_style_map.set(i, {'background':'yellow'});
      }
    })
  }

  //!!!!!!!Only First параметр !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  pare_click(event: Event, item: number) {
    let temp: IModal = {
      group_id: this.group.id,
      date: format(this.date, "yyyy-MM-dd"),
      number: item,
      pares: []
    }
    let sub1_pare: IPare = {
      group_id: this.group.id,
      sub: this.sub_status_map.get(item),
      date: format(this.date, "yyyy-MM-dd"),
      number: item,
      subgroup: 1,
      discipline_id: this.sub1_discipline_map.get(item),
      teacher_id: this.sub1_teacher_map.get(item),
      classroom_id: this.sub1_classroom_map.get(item)
    }
    if(sub1_pare.discipline_id != 0) temp.pares.push(sub1_pare)

    let sub2_pare: IPare = {
      group_id: this.group.id,
      sub: true,
      date: format(this.date, "yyyy-MM-dd"),
      number: item,
      subgroup: 2,
      discipline_id: this.sub2_discipline_map.get(item),
      teacher_id: this.sub2_teacher_map.get(item),
      classroom_id: this.sub2_classroom_map.get(item)
    }
    if(sub2_pare.discipline_id != 0) temp.pares.push(sub2_pare)
    console.log(temp)
    this.modalService.$pares.next(temp)
  }

  loadToParentComponent(){
    let temp: IPare[] = []
    for (let i = 0; i < 6; i++) {
      if(this.sub1_discipline_map.get(i) != null && this.sub1_teacher_map.get(i) != null && this.sub1_classroom_map.get(i) != null){
        let pare: IPare = {
          number: i,
          group_id: this.group.id,
          subgroup:1,
          sub:false,
          date: format(this.date, "yyyy-MM-dd"),
          classroom_id: this.sub1_classroom_map.get(i),
          discipline_id: this.sub1_discipline_map.get(i),
          teacher_id: this.sub1_teacher_map.get(i)
        }
        temp.push(pare)
      }
      if(this.sub2_discipline_map.get(i) != null && this.sub2_teacher_map.get(i) != null && this.sub2_classroom_map.get(i) != null){
        let pare: IPare = {
          number: i,
          group_id: this.group.id,
          subgroup:2,
          sub:true,
          date: format(this.date, "yyyy-MM-dd"),
          classroom_id: this.sub2_classroom_map.get(i),
          discipline_id: this.sub2_discipline_map.get(i),
          teacher_id: this.sub2_teacher_map.get(i)
        }
        temp.push(pare)
      }
    }
    this.saveDay.emit(temp)
  }

  //Вывод 
  getDName(id: number): string | void {
    for(let i = 0; i < this.disciplines.length; i++){
      if(this.disciplines[i].id == id) return this.disciplines[i].name
    }
  }
  getTName(id: number): string | void {
    for(let i = 0; i < this.teachers.length; i++){
      if(this.teachers[i].id == id) return this.teachers[i].name
    }
  }
  getCName(id: number): string | void {
    for(let i = 0; i < this.classrooms.length; i++){
      if(this.classrooms[i].id == id) return this.classrooms[i].number
    }
  }





}
