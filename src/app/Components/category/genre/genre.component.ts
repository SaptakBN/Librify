import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genre:string[] = ['Fiction','Non Fiction','Classic','Poetry','Science Fiction','Fantasy','Suspense','Thriller','Horror','Romance','Memoire','Autobiography']
  constructor(){}
  ngOnInit(): void {

  }
}
