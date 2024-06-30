import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../core/services/data-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{
  constructor(
    private storage: DataStorageService
  ){}

  ngOnInit(): void {
    this.storage.$message.subscribe(response=>{
      if(response!=""){
        this.showMessage(response)
      }
    })
  }
  
  isShow: boolean = false

  message: string = "hello"
  showMessage(message: string) {
    this.message = message
    this.isShow = true
    setInterval(()=>{
      this.isShow = false
    }, 6000)
  }
}
