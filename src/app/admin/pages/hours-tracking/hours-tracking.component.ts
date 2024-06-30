import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../core/services/list.service';
import { IGroup } from '../../../core/models/IGroup';
import { IDiscipline } from '../../../core/models/IDiscipline';
import { IPlanedStats } from '../../../core/models/IPlanedStats';
import { IPastStats } from '../../../core/models/IPastStats';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-hours-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './hours-tracking.component.html',
  styleUrl: './hours-tracking.component.css'
})
export class HoursTrackingComponent implements OnInit{
  constructor(
    private LService: ListService
  ){}

  selectedGroup: number = 0

  groups: IGroup[] = []
  disciplines: IDiscipline[] = []

  planedStats: IPlanedStats[] = []
  pastStats: IPastStats[] = []

  pastUploaded: boolean = false
  planedUploaded: boolean = false


  ngOnInit(): void {
    this.LService.getGroups().subscribe(response=>{
      this.groups = response
    })

    this.LService.getDisciplines().subscribe(response=>{
      this.disciplines = response
    })
    
   

  }

  groupSelected(){
    //Подшрузка запланированых пар
    this.LService.getPlanedStats(this.selectedGroup).subscribe(response=>{
      this.planedStats = response
      this.planedUploaded = true
    })

    this.LService.getPastStats(this.selectedGroup).subscribe(response=>{
      this.pastStats = response
      this.pastUploaded = true
    })
  }

  getPastHoursByDisciplineId(discipline_id:number) : number {
    let hours = 0
    this.pastStats.forEach(el=>{
      if(el.discipline_id == discipline_id) {
        hours = el.pastHours
      }
    })
    return hours;
  }

  getPlanedHoursByDisciplineId(discipline_id:number) : number {
    let hours = 0
    this.planedStats.forEach(el=>{
      if(el.discipline_id == discipline_id) {
        hours = el.planedHours
      }
    })
    return hours;
  }

  planedHoursSave(discipline_id:number, hours: number) {

    this.LService.updatePlanedHours(discipline_id,this.selectedGroup,hours).subscribe(response=>{
      
    })
  }
}
