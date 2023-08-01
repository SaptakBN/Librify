import { Component, OnInit } from '@angular/core';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { GoogleAPIService } from 'src/app/Services/google-api.service';
import { LibraryjsonService } from 'src/app/Services/libraryjson.service';

import { NyTimesService } from 'src/app/Services/ny-times.service';
import { StoreBookDataService } from 'src/app/Services/store-book-data.service';
import { Md5 } from 'ts-md5';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  loader:boolean = false
  featuredCategory: any[] = []
  genre:string[] = ['literature',
  'non_fiction',
  'classics',
  'poetry',
  'science_fiction',
  'fantasy',
  'suspense',
  'thriller',
  'horror',
  'romance',
  'memoire',
  'biography']
  constructor(
    private googleSer: GoogleAPIService,
    private openLibrary:LibraryjsonService
  ) {}
  ngOnInit(): void {
    this.loader = true
  this.genre.forEach((v:any)=>{
      this.openLibrary.carousel_books(v).subscribe((res)=>{
        // console.log(res.splice(0, 12));
        // console.log(v);
        let data = {
          genre:v,
          items:res.splice(0, 12)
        }
        this.featuredCategory.push(data)
        setInterval(()=>{
          this.loader = false
        },2000)
      })
    })
    // console.log(this.featuredCategory);

}
category: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: false,
    autoWidth: false,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ['', ''],
    rtl: false,
    responsive: {
      0: {
        items: 1,
      },
      250: {
        items: 2,
      },
      500: {
        items: 3,
      },
      750: {
        items: 4,
      },
      1000: {
        items: 5,
      }
  },
  nav: true,
};
}
