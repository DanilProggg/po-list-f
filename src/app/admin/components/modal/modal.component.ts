import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IPare } from '../../../core/models/IPare';
import { ModalService } from '../../../core/services/modal.service';
import { FormsModule } from '@angular/forms';
import { IDiscipline } from '../../../core/models/IDiscipline';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { ITeacher } from '../../../core/models/ITeacher';
import { IClassroom } from '../../../core/models/IClassroom';
import { group } from '@angular/animations';
import { format } from 'date-fns';
import { ListService } from '../../../core/services/list.service';
import { DataStorageService } from '../../../core/services/data-storage.service';



@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnChanges{
  constructor(
    private modalService: ModalService,
    private LService: ListService,
    private storage: DataStorageService
  ){}


  @Input() disciplines: IDiscipline[] = []
  @Input() teachers: ITeacher[] = []
  @Input() classrooms: IClassroom[] = []

  pares: IPare[] = []
  group_id: number = 0
  date: string = ""
  number: number = 0


  show: boolean = false
  sub_groups: boolean = false

  discipline_map = new Map()
  teacher_map = new Map()
  classroom_map = new Map()

  ngOnInit(): void {
    this.modalService.$pares.subscribe(response=>{
      this.pares = response.pares
      this.group_id = response.group_id
      this.date = response.date
      this.number = response.number

      this.sub_groups = false

      for(let i = 1; i < 3; i++){
        this.discipline_map.set(i, "---");
        this.teacher_map.set(i, "---")
        this.classroom_map.set(i, "---")
      }
      this.pares.forEach(element=>{
        if(element.subgroup == 1) {
          this.discipline_map.set(1, element.discipline_id);
          this.teacher_map.set(1, element.teacher_id);
          this.classroom_map.set(1, element.classroom_id);
        }
        if(element.subgroup == 2) {
          this.discipline_map.set(2, element.discipline_id);
          this.teacher_map.set(2, element.teacher_id);
          this.classroom_map.set(2, element.classroom_id);
        }
        if(element.sub == true) this.sub_groups = true
      })
      this.show = true
    })
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  save(){
    let pares: IPare[] = []
    for(let i = 1; i < 3; i++){
      //Котсыльная проверка на строку
      if(this.discipline_map.get(i) != 0 && this.discipline_map.get(i) != "---") {
        let temp: IPare = {
          group_id: this.group_id,
          sub: this.sub_groups,
          date: this.date,
          number: this.number,
          subgroup: i,
          discipline_id: this.discipline_map.get(i),
          teacher_id: this.teacher_map.get(i),
          classroom_id: this.classroom_map.get(i)
        }
        pares.push(temp)

      } else {
        let temp: IPare = {
          group_id: this.group_id,
          sub: this.sub_groups,
          date: this.date,
          number: this.number,
          subgroup: i,
          discipline_id: 0,
          teacher_id: 0,
          classroom_id: 0
        }
        pares.push(temp)
      }
      
    }
    console.log(pares)
    this.LService.uploadParesV2(pares, format(this.storage.date[0],"yyyy-MM-dd"), format(this.storage.date[6],"yyyy-MM-dd")).subscribe(response=>{
      let temp : IPare[] = response
      console.log(temp)
      this.storage.list = response
      this.storage.checkWarning()
      this.storage.$list.next(temp)
    })
    this.show = false
  }

  
}
