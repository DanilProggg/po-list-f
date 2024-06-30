import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn:"root"
})
export class UserService {



  constructor(private http: HttpClient, private cookie: CookieService) {}



  domain: string = "http://localhost:8080"
  /*
    Методы для авторизации
  */
  public set_token(login: string, password: string) {
    this.cookie.set("token", btoa(login+":"+password));
  }

  authinticate() {
    return this.http.get<any>(this.domain+"/api/v1/auth", { headers: this.get_credentials() });
  }

  authinticateWithoutCredentials(login: string, passwd: string){
    return this.http.get<any>(this.domain+"/api/v1/auth", { headers: 
      new HttpHeaders({"Authorization":"Basic " + btoa(login+":"+passwd)})
   });
  }

  public get_token(): string {
    return this.cookie.get("token");
  }

  public delete_token(): void {
    this.cookie.delete("token");
  }
  
  /*
    Возвращает хедер с авторизацией
  */
  get_credentials(): HttpHeaders{
    return new HttpHeaders({"Authorization":"Basic " + this.cookie.get("token")});
  }


}

