import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../core/services/list.service';
import { IGroup } from '../../../core/models/IGroup';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  groups: IGroup[] = []
  
  constructor(private LService: ListService){}

  ngOnInit(): void {
    this.LService.getGroups().subscribe(responce=>{
      this.groups = responce
    })
  }
}
