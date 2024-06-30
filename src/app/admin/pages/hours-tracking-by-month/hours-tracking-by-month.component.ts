import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { IGroup } from '../../../core/models/IGroup';
import { IDiscipline } from '../../../core/models/IDiscipline';
import { ListService } from '../../../core/services/list.service';
import { ITeacher } from '../../../core/models/ITeacher';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hours-tracking-by-month',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './hours-tracking-by-month.component.html',
  styleUrl: './hours-tracking-by-month.component.css'
})
export class HoursTrackingByMonthComponent implements OnInit{

  groups: IGroup[] = []
  disciplines: IDiscipline[] = []
  teachers: ITeacher[] = []


  constructor(
    private LService: ListService
  ){}


  selectedGroup: number = 0
  selectedTeacher: number = 0

  ngOnInit(): void {
    this.LService.getGroups().subscribe(response=>{
      this.groups = response
    })

    this.LService.getDisciplines().subscribe(response=>{
      this.disciplines = response
    })
    
    this.LService.getTeachers().subscribe(response=>{
      this.teachers = response
      console.log(response)
    })
  }


  selected(){
    console.log(this.teachers)
  }

  getDName(id: number){
    let str: string = ""
    this.disciplines.forEach(el=>{
      if(el.id == id) str = el.name
    })
    return str
  }
}
