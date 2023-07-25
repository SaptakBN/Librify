import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreBookDataService {
  fiction_api:string = 'http://localhost:3000'
  non_fiction_api:string = 'http://localhost:3000'
  constructor(private httpSer:HttpClient) { }
  nyTimesStorage!:any;
  // setNYBookData(books:any){
  //   this.nyTimesStorage = books;
  // }
  // getNYBookData(){
  //   return this.nyTimesStorage
  // }
  getBookData(category:string):Observable<any>{
    return this.httpSer.get<any>(`${this.fiction_api}/${category}`)
  }
}
