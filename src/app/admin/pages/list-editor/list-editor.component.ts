import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from '../../../core/services/list.service';
import { IGroup } from '../../../core/models/IGroup';
import { IDiscipline } from '../../../core/models/IDiscipline';
import { ITeacher } from '../../../core/models/ITeacher';
import { IClassroom } from '../../../core/models/IClassroom';
import { DateFnsModule } from 'ngx-date-fns';
import { IPare } from '../../../core/models/IPare';
import { DataStorageService } from '../../../core/services/data-storage.service';
import { GroupItemComponent } from '../../components/group-item/group-item.component';
import { DayItemComponent } from '../../components/day-item/day-item.component';
import { ModalComponent } from '../../components/modal/modal.component';


@Component({
  selector: 'app-list-editor',
  standalone: true,
  imports: [CommonModule, DateFnsModule, GroupItemComponent, DayItemComponent, ModalComponent],
  templateUrl: './list-editor.component.html',
  styleUrl: './list-editor.component.css',
})
export class ListEditorComponent implements OnInit, OnChanges{


  date:Date[] = []
  groups: IGroup[] = []
  disciplines: IDiscipline[] = []
  teachers: ITeacher[] = []
  classrooms: IClassroom[] = []

  

  constructor(private LService: ListService, private dataStorage: DataStorageService){}


  /*
    Загрузка всей информации для дальнейшей
    поставки в дочерние компоненты
  */
  ngOnInit(): void{


    this.date = this.dataStorage.date

    this.LService.getGroups().subscribe(response=>{
      this.groups = response
    })

    this.LService.getClassrooms().subscribe(response => {
      this.classrooms = response
    })

    this.LService.getDisciplines().subscribe(response => {
      this.disciplines = response
    })

    this.LService.getTeachers().subscribe(responce => {
      this.teachers = responce
    })
 
  }

  ngOnChanges(): void{

  }
  
  uploads: IPare[] = []
  counter: number = 0
  loadPares(pares: IPare[]){
    pares.forEach(element => {
      this.uploads.push(element)
    });
    this.counter++
    if(this.counter == this.groups.length) {
      this.dataStorage.uploadPares(this.uploads)
      this.counter = 0
      this.uploads = []
    }
  }

  goToNextWeek(){
    this.date = this.dataStorage.nextWeek()
  }

  goToPrevWeek(){
    this.date = this.dataStorage.previousWeek()
  }



}
