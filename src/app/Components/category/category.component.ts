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
  // bestseller_fiction!: any;
  // bestseller_non_fiction!: any;
  featuredCategory: any[] = []
  genre:string[] = ['literature',
  'non_Fiction',
  'classics',
  'poetry',
  'sci_fi',
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



  this.genre.forEach((v:any)=>{
      this.openLibrary.carousel_books(v).subscribe((res)=>{
        // console.log(res.splice(0, 12));
        // console.log(v);
        let data = {
          genre:v,
          items:res.splice(0, 12)
        }
        this.featuredCategory.push(data)
      })
    })
    console.log(this.featuredCategory);

}
category: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 700,
  autoWidth:false,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  navText: ['', ''],
  rtl:false,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 2,
    },
    740: {
      items: 3,
    },
    940: {
      items: 4,
    },
    1140: {
      items: 5,
    },
    1340: {
      items: 6,
    },
  },
  nav: true,
};
}