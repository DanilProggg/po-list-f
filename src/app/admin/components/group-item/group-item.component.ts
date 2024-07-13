import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, input } from '@angular/core';
import { IGroup } from '../../../core/models/IGroup';
import { IPare } from '../../../core/models/IPare';
import { CommonModule, DatePipe } from '@angular/common';
import { IDiscipline } from '../../../core/models/IDiscipline';
import { ITeacher } from '../../../core/models/ITeacher';
import { IClassroom } from '../../../core/models/IClassroom';
import { DataStorageService } from '../../../core/services/data-storage.service';
import { DayItemComponent } from '../day-item/day-item.component';



@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [DatePipe, CommonModule, DayItemComponent],
  templateUrl: './group-item.component.html',
  styleUrl: './group-item.component.css'
})
export class GroupItemComponent implements OnInit{

  constructor(
    private storage: DataStorageService
  ){}

  @Output() saveGroup = new EventEmitter<IPare[]>
  
  @Input() group: IGroup
  @Input() date: Date[]

  @Input() disciplines:IDiscipline[]
  @Input() teachers: ITeacher[]
  @Input() classrooms: IClassroom[]

  uploads: IPare[] = []
  counter: number = 0

  ngOnInit(): void {
    
  }


  addPareAndSaveToStorage(pares: IPare[]): void {
    pares.forEach(element => {
      this.uploads.push(element)
    });
    this.counter++
    if(this.counter == 7) {
      this.saveGroup.emit(this.uploads)
      this.counter = 0
      this.uploads = []
    }
  }

 


  


}
