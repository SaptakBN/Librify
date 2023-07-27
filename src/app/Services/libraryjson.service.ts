import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryjsonService {
  open_library_api:string = 'http://localhost:3100'
  constructor(private http:HttpClient) { }
  carousel_books(genre:any):Observable<any>{
    return this.http.get<any>(`${this.open_library_api}/${genre}`)
  }
  getAllBooks():Observable<any>{
    return this.http.get<any>(`${this.open_library_api}/allBooks`)
  }
  addNewBook_genre(genre:any, data:any):Observable<any>{
    return this.http.post<any>(`${this.open_library_api}/${genre}`, data)
  }
}
