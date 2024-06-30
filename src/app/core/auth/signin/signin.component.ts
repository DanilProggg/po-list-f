import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{

  error: boolean

  constructor(private authService: UserService, 
    private router: Router
  ){}


  ngOnInit(): void {
    this.error = false
  }

  auth = new FormGroup({
    login: new FormControl('', Validators.nullValidator),
    password: new FormControl('', Validators.nullValidator)
  })

  onSubmit(): void {
    this.authService.authinticateWithoutCredentials(this.auth.controls.login.value!,this.auth.controls.password.value!).subscribe(response => {
      console.log("Response: "+response)
      }, (err: HttpErrorResponse) => {
        console.log(err.status) //expected 404 ,500 and so on
        if(err.status == 200) {
          this.authService.set_token(this.auth.controls.login.value!,this.auth.controls.password.value!)
          this.router.navigate(["admin"])
        }
      }
    );
  }

  
  
}
