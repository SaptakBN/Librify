import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  set(fname:string, lname:string, mail:string, img:string, admin:any, token:string){
    localStorage.setItem('fname',fname);
    localStorage.setItem('lname',lname);
    localStorage.setItem('mail',mail);
    localStorage.setItem('img',img);
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('admin', admin);
  }
  get(data:string){
    return localStorage.getItem(data)
  }
  getToken(){
    return sessionStorage.getItem('token')
  }
  getAdmin(){
    return sessionStorage.getItem('admin')
  }
  logout(){
    sessionStorage.clear()
  }
}
