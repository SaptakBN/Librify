import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAPIService {
  open_lib_search:string = 'https://openlibrary.org/search.json'
  open_lib:string = 'http://openlibrary.org/subjects'
  google_api:string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http:HttpClient) { }

  getBookBydetails(title:string, author:string):Observable<any>{
    return this.http.get<any>(this.google_api,{
      params:{
        'q':decodeURI(`intitle:${title.replaceAll(' ','+')}+inauthor${author.replaceAll(' ', '+')}`)
      }
    })
  }
  openLibrary(genre:string):Observable<any>{
    return this.http.get<any>(`${this.open_lib}/${genre.toLowerCase().replaceAll(' ',"-")}.json`,{
      params:{
        'sort':'rating',
        'details':'true',
        'limit':12,
        'ebooks':true
      }
    })
  }
  fetchLink(link:string):Observable<any>{
    return this.http.get<any>(link)
  }
  openLibSearch(title:string, author:string):Observable<any>{
    return this.http.get<any>(this.open_lib_search, {
      params:{
        title:title.replaceAll(' ', '+'),
        author:author.replaceAll(' ', '+'),
        limit:12,
      }
    })
  }
}
