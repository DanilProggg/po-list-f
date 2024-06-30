import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDiscipline } from '../../../core/models/IDiscipline';
import { ListService } from '../../../core/services/list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disciplines',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.css'
})
export class DisciplinesComponent implements OnInit{
  discForm = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    private LService: ListService
  ){}

  disciplines: IDiscipline[] = []

  ngOnInit(): void {
    this.LService.getDisciplines().subscribe(response=>{
      this.disciplines = response
    })
  }

  onSubmit(){
    this.LService.uploadDiscipline(this.discForm.controls.name.value!).subscribe(response=>{
      this.disciplines = response
    })
    this.discForm.reset()
  }

  deleteDiscipline(event: Event){
    let button = event.target as HTMLInputElement

    this.LService.deleteDiscipline(button.parentElement?.id!).subscribe(response=>{
      console.log(response)
      this.disciplines = response
    })
  }
}
