import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logIN_api = 'http://localhost:3100/user'
  constructor(private httpSer:HttpClient) { }
  logIN(mail:string):Observable<User[]>{
    return this.httpSer.get<User[]>(`${this.logIN_api}/${mail}`)
  }
  signUP(regData:any):Observable<User[]>{
    return this.httpSer.post<User[]>(this.logIN_api, regData)
  }
  addToLibrary(mail:any, userData:any):Observable<User[]>{
    return this.httpSer.put<User[]>(`${this.logIN_api}/${mail}`, userData)
  }
  getAllUser():Observable<User[]>{
    return this.httpSer.get<User[]>(this.logIN_api)
  }
}
