import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ITeacher } from '../../../core/models/ITeacher';
import { ListService } from '../../../core/services/list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit{
  teacherForm = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    private LService: ListService
  ){}

  teachers: ITeacher[] = []

  ngOnInit(): void {
    this.LService.getTeachers().subscribe(response =>{
      this.teachers = response
    })
  }

  onSubmit(){
    this.LService.uploadTeacher(this.teacherForm.controls.name.value!).subscribe(response=>{
      this.teachers = response

    })
    this.teacherForm.reset()
  }

  deleteTeacher(event: Event){
    let button = event.target as HTMLInputElement

    console.log(button.parentElement?.id)
    this.LService.deleteTeacher(button.parentElement?.id!).subscribe(response=>{
      this.teachers = response
    })
  }
}
