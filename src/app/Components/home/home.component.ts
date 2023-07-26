import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LibraryjsonService } from 'src/app/Services/libraryjson.service';
import { NyTimesService } from 'src/app/Services/ny-times.service';
import { StoreBookDataService } from 'src/app/Services/store-book-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bestseller_fiction!: any;
  bestseller_non_fiction!: any;
  allBooks!:any;
  search:string = '';
  filterBySearch!:any
  constructor(
    private nyTimeSer: NyTimesService,
    private nyStorage: StoreBookDataService,
    private openLibrary: LibraryjsonService
  ) {}
  ngOnInit(): void {
    this.openLibrary.carousel_books('nyTimesFiction').subscribe((res)=>{
      this.bestseller_fiction = res;
      // console.log(this.bestseller_fiction);
    })
    this.openLibrary.carousel_books('nyTimesNonfiction').subscribe((res)=>{
      this.bestseller_non_fiction = res;
    })
    this.openLibrary.getAllBooks().subscribe(res=>{
      // console.log(res);
      this.allBooks = res
    })
  }

  startSearching(){
    this.filterBySearch = this.allBooks.filter((v:any)=>v.title.toLowerCase().includes(this.search.toLowerCase()))
    this.filterBySearch = this.filterBySearch.slice(0,5)
    // console.log(this.filterBySearch);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoWidth:false,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ['', ''],
    rtl:true,
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
    nav: false,
  };
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoHeight:true,
    navSpeed: 700,
    autoplay: true,
    autoWidth:true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
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
    nav: false,
  };
}
