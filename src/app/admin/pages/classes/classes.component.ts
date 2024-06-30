import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IGroup } from '../../../core/models/IGroup';
import { ListService } from '../../../core/services/list.service';
import { IClassroom } from '../../../core/models/IClassroom';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../../core/services/data-storage.service';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent implements OnInit{

  groups: IClassroom[] = []

  constructor(
    private LService: ListService
  ){}


  classForm = new FormGroup({
    number: new FormControl('')
  })

  classrooms: IClassroom[] = []


  ngOnInit(): void {
    this.LService.getClassrooms().subscribe(response =>{
      this.classrooms = response
    })
  }

  onSubmit(){
    this.LService.uploadClassroom(this.classForm.controls.number.value!).subscribe(response=>{
      this.classrooms = response
    })
    this.classForm.reset()
  }

  deleteClassroom(event: Event){
    let button = event.target as HTMLInputElement

    console.log(button.parentElement?.id)
    this.LService.deleteClassroom(button.parentElement?.id!).subscribe(response=>{
      this.classrooms = response
    })
  }

}
