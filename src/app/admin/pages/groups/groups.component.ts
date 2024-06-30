import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IGroup } from '../../../core/models/IGroup';
import { ListService } from '../../../core/services/list.service';
import { UserService } from '../../../core/services/user.service';
import { DateUnixPipe } from '../../../core/pipes/date-unix.pipe';
import { el } from 'date-fns/locale';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [ReactiveFormsModule, DateUnixPipe, CommonModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit{

  groups: IGroup[] = []


  constructor(
    private LService: ListService,
    private auth: UserService
  ){}

  groupForm = new FormGroup({
    name: new FormControl('')
  })

  ngOnInit(): void {
    this.LService.getGroups().subscribe(response=>{
      this.groups = response
    })
  }

  onSubmit(){
    this.LService.uploadGroup(this.groupForm.controls.name.value!).subscribe(response=>{
      this.groups = response
    })
    this.groupForm.reset()
  }

  deleteGroup(event: Event){
    let button = event.target as HTMLInputElement

    console.log(button.parentElement?.id)
    this.LService.deleteGroup(button.parentElement?.id!).subscribe(response=>{
      this.groups = response
    })
  }

  updateGroup(event: Event){
    let input = event.target as HTMLInputElement
    let group_id = Number(input.parentElement?.id)
    
    this.groups.forEach(el=>{
      if(el.id == group_id){
        this.LService.updateGroup(group_id, new Date(input.value).getTime()).subscribe(response=>{
          this.groups = response
        })
      }
    }) 
  }
}
