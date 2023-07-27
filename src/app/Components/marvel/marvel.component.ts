import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/Services/marvel.service';
import { Md5 } from 'ts-md5';
// import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styleUrls: ['./marvel.component.css']
})
export class MarvelComponent implements OnInit {
  super_hero_data:any[]=[]
  super_hero = [1009610, 1009368, 1009220, 1009664, 1009268 , 1011006, 1009351, 1009187, 1009189]
  super_heroID = {
    spider_man:1009610,
    iron_man:1009368,
    captain_america:1009220,
    thor:1009664,
    deadpool:1009268,
    wolv:1011006,
    hulk:1009351,
    panther:1009187,
    widow:1009189
  }
  public_key:string = '744c369075a2d8a6cdc39dd3c2e9b22b'
  private_key:string = 'd9843fb3d61663e6a72679a8cce7bc9f6d0a9c0b'
  loader:boolean = false
  constructor(private marvelSer:MarvelService){}
  ngOnInit(): void {
    this.loader = true
    let date =  Date.now()
    // console.log(date);
    let md5 = new Md5()
    let hash = md5.appendStr(`${date}${this.private_key}${this.public_key}`).end()
    // console.log(hash);
    this.super_hero.forEach((v)=>{
      this.marvelSer.getCharByID(date, hash, v).subscribe((res)=>{
        // console.log(res);
        this.super_hero_data.push(res.data.results[0])
        // console.log(this.super_hero_data);
        setTimeout(() => {
          this.loader = false
        }, 1000);
      })
    })
  }
}
