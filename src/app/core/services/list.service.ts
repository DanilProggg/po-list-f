import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPare } from '../models/IPare';
import { Observable, groupBy } from 'rxjs';
import { IDiscipline } from '../models/IDiscipline';
import { ITeacher } from '../models/ITeacher';
import { IClassroom } from '../models/IClassroom';
import { IGroup } from '../models/IGroup';
import { UserService } from './user.service';
import { IPlanedStats } from '../models/IPlanedStats';
import { IPastStats } from '../models/IPastStats';

@Injectable({
  providedIn: 'root'
})
export class ListService {


  domain: string ="http://localhost:8080"

  constructor(private http: HttpClient, private auth: UserService) {

  }
  
  /*
    Методы для получения информации
  */
  getPares(from: string, to: string): Observable<IPare[]>{
    let params = new HttpParams()
      .append("from", from)
      .append("to", to)
    //Получение недели IPare[]
    return this.http.get<IPare[]>(this.domain+"/api/v1/pare/week", {params:params})

  }

  getListByGroup(group_id: number, from: string, to: string): Observable<IPare[]>{
    let params = new HttpParams()
      .append("id", group_id)
      .append("from", from)
      .append("to", to)
    
    return this.http.get<IPare[]>(this.domain+"/api/v1/pare/bygroup",{params: params})
  }

  //Http Params с датой для того, что бы запрос возвращал корректное расписание на неделю
  uploadPares(pares: IPare[], from: string, to: string): Observable<any>{
    let params = new HttpParams()
      .append("from", from)
      .append("to", to)
    return this.http.post<any>(this.domain+"/api/v1/pare/upload", pares, { params: params, headers: this.auth.get_credentials() })
  }

  uploadParesV2(pares: IPare[], from: string, to: string): Observable<any>{
    let params = new HttpParams()
      .append("from", from)
      .append("to", to)
    return this.http.post<any>(this.domain+"/api/v1/pare/upload/v2", pares, { params: params, headers: this.auth.get_credentials() })
  }

  getGroups(): Observable<IGroup[]>{
    return this.http.get<IGroup[]>(this.domain+"/api/v1/group/all")
  }

  getDisciplines(): Observable<IDiscipline[]>{
    return this.http.get<IDiscipline[]>(this.domain+"/api/v1/discipline/all")
  }

  getTeachers(): Observable<ITeacher[]>{
    return this.http.get<ITeacher[]>(this.domain+"/api/v1/teacher/all")
  }

  getClassrooms(): Observable<IClassroom[]>{
    return this.http.get<IClassroom[]>(this.domain+"/api/v1/classroom/all")
  }

  uploadGroup(group: string){
    let params = new HttpParams()
      .append("name", group);

    return this.http.post<any>(this.domain+"/api/v1/group/add", params, { headers: this.auth.get_credentials() })
  }

  deleteGroup(group_id: string){
    let params = new HttpParams()
    .append("id", Number(group_id));

  return this.http.post<any>(this.domain+"/api/v1/group/delete", params, { headers: this.auth.get_credentials() })
  }

  updateGroup(id: number, date: number){
    let params = new HttpParams()
    .append("id", id)
    .append("date", date);
    return this.http.put<any>(this.domain+"/api/v1/group/update", params, { headers: this.auth.get_credentials() })
  }

  uploadClassroom(number: string){
    let params = new HttpParams()
      .append("number", number);

    return this.http.post<any>(this.domain+"/api/v1/classroom/add", params, { headers: this.auth.get_credentials() })
  }

  deleteClassroom(classroom_id: string){
    let params = new HttpParams()
    .append("id", Number(classroom_id));

  return this.http.post<any>(this.domain+"/api/v1/classroom/delete", params, { headers: this.auth.get_credentials() })
  }


  uploadDiscipline(name: string){
    let params = new HttpParams()
      .append("name", name);

    return this.http.post<any>(this.domain+"/api/v1/discipline/add", params, { headers: this.auth.get_credentials() })
  }

  deleteDiscipline(discipline_id: string){
    let params = new HttpParams()
    .append("id", Number(discipline_id));

    return this.http.post<any>(this.domain+"/api/v1/discipline/delete", params, { headers: this.auth.get_credentials() })
  }

  uploadTeacher(name: string){
    let params = new HttpParams()
      .append("name", name);

    return this.http.post<any>(this.domain+"/api/v1/teacher/add", params, { headers: this.auth.get_credentials() })
  }

  deleteTeacher(teacher_id: string){
    let params = new HttpParams()
    .append("id", Number(teacher_id));

    return this.http.post<any>(this.domain+"/api/v1/teacher/delete", params, { headers: this.auth.get_credentials() })
  }

  //STATS

  getPlanedStats(group_id:number) {
    let params = new HttpParams()
    .append("group", group_id)

    return this.http.get<IPlanedStats[]>(this.domain+"/api/v1/stats/planed", { params:params, headers: this.auth.get_credentials() })
  }

  getPastStats(group_id:number) {
    let params = new HttpParams()
    .append("group", group_id)

    return this.http.get<IPastStats[]>(this.domain+"/api/v1/stats/past", { params:params, headers: this.auth.get_credentials() })
  }

  updatePlanedHours(discipline_id: number, group_id:number, hours: number){
    let params = new HttpParams()
    .append("group", group_id)
    .append("discipline", discipline_id)
    .append("hours", hours)
    return this.http.post<IPastStats[]>(this.domain+"/api/v1/stats/add", params, { headers: this.auth.get_credentials() })

  }

  
}
