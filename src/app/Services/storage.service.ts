import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  set(fname:string, lname:string, mail:string, img:string){
    localStorage.setItem('fname',fname);
    localStorage.setItem('lname',lname);
    localStorage.setItem('mail',mail);
    localStorage.setItem('img',img)
    sessionStorage.setItem('token',mail);
  }
  get(data:string){
    return localStorage.getItem(data)
  }
  getToken(){
    return sessionStorage.getItem('token')
  }
  logout(){
    sessionStorage.clear()
  }
}
