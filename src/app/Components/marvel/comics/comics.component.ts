import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from 'src/app/Services/marvel.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  public_key:string = '744c369075a2d8a6cdc39dd3c2e9b22b'
  private_key:string = 'd9843fb3d61663e6a72679a8cce7bc9f6d0a9c0b'
  hero_id!:string | null
  hero_name!:string | null;
  heroData!:any;
  loader:boolean = false
  constructor(private aroute:ActivatedRoute, private marvelSer:MarvelService){}
  ngOnInit(): void {
    this.loader = true
    let date = Date.now();
    let md5 = new Md5();
    let hash = md5.appendStr(`${date}${this.private_key}${this.public_key}`).end()
    // console.log(date, hash);
    this.aroute.paramMap.subscribe((param)=>{
      this.hero_id = param.get('charID')
      // console.log(this.hero_id);
      this.aroute.queryParamMap.subscribe((qParam)=>{
        this.hero_name = qParam.get('hero_name')
        console.log(this.hero_name);
        this.marvelSer.getComicsByCharID(date, hash, this.hero_id, this.hero_name).subscribe((res)=>{
          // console.log(res.data.results);
          this.heroData = res.data.results
          console.log(this.heroData);
          setTimeout(() => {
            this.loader = false
          }, 1000);
        })
      })
    })
  }
}
