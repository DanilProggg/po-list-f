import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from './ui/admin-header/admin-header.component';
import { DataStorageService } from '../core/services/data-storage.service';
import { MessageComponent } from './components/message/message.component';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    RouterOutlet,
    MessageComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers:[DataStorageService, ModalService]
})
export class AdminComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {

  }
  
}
