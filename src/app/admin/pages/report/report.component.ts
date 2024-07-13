import { Component, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { IGroup } from '../../../core/models/IGroup';
import { ListService } from '../../../core/services/list.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileSaverModule } from 'ngx-filesaver';
import { base64StringToBlob } from 'blob-util';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [NgSelectModule, FormsModule, CommonModule, ReactiveFormsModule, FileSaverModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{
  constructor(
    private LService: ListService
  ){}

  groups: IGroup[] = []
  selectedGroup: number = 0
  from:Date = new Date()
  to:Date = new Date()

  domain: string = this.LService.domain

  getFile = new FormGroup({
    from: new FormControl<Date>(new Date()),
    to: new FormControl<Date>(new Date()),
  })

  ngOnInit(): void {
    this.LService.getGroups().subscribe(response=>{
      this.groups = response
    })
  }


  onSubmit(){
    console.log(this.selectedGroup)
    console.log(this.getFile.controls.from.value)
    console.log(this.getFile.controls.to.value)

    // this.LService.downloadReport(this.selectedGroup, this.getFile.controls.from.value!, this.getFile.controls.to.value!).subscribe(response=>{
    //   let blob = base64StringToBlob(response.fileContent, {type:"application/vnd.ms-excel"})
    // })
  
  }

  groupChange(event: Event){
    this.selectedGroup = Number(event)
  }
  
  customDatePipe(date: Date){
    return format(date, "yyyy-MM-dd")
  }
}
