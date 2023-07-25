import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NyTimesService {
  nyTimes_api:string = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json';
  key:string = 'cWs9kNx9xfwtYEVFpEzMgXdUSIgY4t95'
  constructor(private nyService:HttpClient) { }
  getList():Observable<any>{
    return this.nyService.get<any>(this.nyTimes_api,{
      params:{
        'api-key':this.key
      }
    })
  }
}
