import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Req } from '../Classes/req';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReqService {
  req_api:string = 'http://localhost:3300/requests'
  constructor(private httpSer:HttpClient) { }
  get_all_req():Observable<Req[]>{
    return this.httpSer.get<Req[]>(this.req_api)
  }
  post_req(reqData:any):Observable<Req[]>{
    return this.httpSer.post<Req[]>(this.req_api, reqData)
  }
}
