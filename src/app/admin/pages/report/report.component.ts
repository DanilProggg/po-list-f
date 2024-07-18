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
  
  customDatePipe(date: Date){
    return format(date, "yyyy-MM-dd")
  }
}
