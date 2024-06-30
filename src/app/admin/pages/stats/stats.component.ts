import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent{
  
}