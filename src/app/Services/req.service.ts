import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Req } from '../Classes/req';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReqService {
  req_api:string = 'http://localhost:3200/requests'
  constructor(private httpSer:HttpClient) { }
  get_all_req():Observable<Req[]>{
    return this.httpSer.get<Req[]>(this.req_api)
  }
  post_req(reqData:any):Observable<Req[]>{
    return this.httpSer.post<Req[]>(this.req_api, reqData).pipe(catchError(this.errHandle))
  }
  edit_req(id:number, req_data:any):Observable<any>{
    return this.httpSer.put<Req[]>(`${this.req_api}/${id}`, req_data)
  }
  get_req(id:number):Observable<any>{
    return this.httpSer.get<Req[]>(`${this.req_api}/${id}`)
  }
  errHandle(err:HttpErrorResponse){
    return throwError(()=>err)
  }
}
