import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genre:string[] = ['literature','non_Fiction','classic','poetry','sci_fi','fantasy','suspense','thriller','horror','romance','memoire','biography']
  constructor(){}
  ngOnInit(): void {

  }
}
