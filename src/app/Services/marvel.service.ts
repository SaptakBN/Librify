import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  super_hero = [
    1009610, 1017104, 1009220, 1009664, 1009268, 1011006, 1009351, 1009187,
    1009189,
  ];
  public_key: string = '744c369075a2d8a6cdc39dd3c2e9b22b';
  private_key: string = 'd9843fb3d61663e6a72679a8cce7bc9f6d0a9c0b';
  marvel_api: string =
    'https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&noVariants=false&dateDescriptor=thisMonth&dateRange=2015-01-01%2C2022-01-02&hasDigitalIssue=true&characters=1009610%2C1017104%2C1017105%2C1017106%2C1017107%2C1011006&orderBy=issueNumber&limit=12&offset=12';
  character: string =
    'https://gateway.marvel.com:443/v1/public/characters?limit=100&nameStartsWith=iron';
  char_ID_api: string = 'https://gateway.marvel.com:443/v1/public/characters';
  comics_api: string =
    'https://gateway.marvel.com:443/v1/public/characters/1009610/comics';
  comic_details_api: string = 'https://gateway.marvel.com:443/v1/public/comics';
  constructor(private httpSer: HttpClient) {}
  get(ts: any, hash: any): Observable<any> {
    return this.httpSer.get<any>(this.character, {
      params: {
        ts: ts,
        apikey: this.public_key,
        hash: hash,
      },
    });
  }
  getCharByID(ts: any, hash: any, id: any): Observable<any> {
    return this.httpSer.get<any>(`${this.char_ID_api}/${id}`, {
      params: {
        ts: ts,
        apikey: this.public_key,
        hash: hash,
      },
    });
  }
  getComicsByCharID(ts: any, hash: any, id: any, name: any): Observable<any> {
    console.log(name.slice(0, 1));
    if (name != 'Wolverine (Ultimate)') {
      return this.httpSer.get<any>(`${this.char_ID_api}/${id}/comics`, {
        params: {
          orderBy: 'focDate',
          ts: ts,
          apikey: this.public_key,
          hash: hash,
          titleStartsWith: `${name.slice(0, 4)}`,
          dateRange: '2012-01-01, 2022-01-02',
        },
      });
    } else {
      return this.httpSer.get<any>(`${this.char_ID_api}/${id}/comics`, {
        params: {
          orderBy: 'focDate',
          ts: ts,
          apikey: this.public_key,
          hash: hash,
        },
      });
    }
  }
  
  getComicByID(ts: any, hash: any, comicID: any): Observable<any> {
    return this.httpSer.get<any>(`${this.comic_details_api}/${comicID}`, {
      params: {
        ts: ts,
        apikey: this.public_key,
        hash: hash,
      },
    });
  }
}
