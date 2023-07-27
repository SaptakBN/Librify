import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleAPIService } from 'src/app/Services/google-api.service';
import { LibraryjsonService } from 'src/app/Services/libraryjson.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  loader:boolean = false
  cover!: any;
  all_books!: any;
  page_books!:any
  genre!: any;
  current_page!:number;
  constructor(
    private aroute: ActivatedRoute,
    private googleAPI: GoogleAPIService,
    private openLibrary: LibraryjsonService
  ) {}
  ngOnInit(): void {
    this.loader = true
    this.current_page = 1
    // this.loader = true
    this.aroute.paramMap.subscribe((param) => {
      this.genre = param.get('category');
      this.openLibrary.carousel_books(this.genre).subscribe((res)=>{
        // console.log(res);
        this.all_books = res
        this.page_books = this.all_books.slice(0,12)
        // console.log(this.page_books);
        setInterval(() => {
          this.loader = false
        }, 2000);
        this.page_books.forEach((v:any)=>{
          if(v.details==undefined){
            this.googleAPI
            .getBookBydetails(v?.title, v?.authors[0]?.name)
            .subscribe((resG) => {
              v.details = resG?.items[0];
              // console.log(v.details);
            });
          }
        })
        // console.log(this.page_books);
        // console.log(this.all_books.length);
      })
      });

  }
  page(n:number){
    this.current_page = n
    // console.log(this.current_page, n);

    switch (n) {
      case 1:
        this.page_books = this.all_books.slice(0, 12);
        this.page_books.forEach((v:any)=>{
          if(v.details==undefined){
            this.googleAPI
            .getBookBydetails(v?.title, v?.authors[0]?.name)
            .subscribe((resG) => {
              v.details = resG?.items[0];
              console.log(v.details);
            });
          }
        })
        // console.log(this.page_books);

        break;
      case 2:
        this.page_books = this.all_books.slice(12, 24);
        this.page_books.forEach((v:any)=>{
          if(v.details==undefined){
            this.googleAPI
            .getBookBydetails(v?.title, v?.authors[0]?.name)
            .subscribe((resG) => {
              v.details = resG?.items[0];
              console.log(v.details);
            });
          }
        })
        // console.log(this.page_books);

        break;
      case 3:
        this.page_books = this.all_books.slice(24, 36);
        this.page_books.forEach((v:any)=>{
          if(v.details==undefined){
            this.googleAPI
            .getBookBydetails(v?.title, v?.authors[0]?.name)
            .subscribe((resG) => {
              v.details = resG?.items[0];
              console.log(v.details);
            });
          }
        })
        // console.log(this.page_books);

        break;
      case 4:
        this.page_books = this.all_books.slice(36, 48);
        this.page_books.forEach((v:any)=>{
          if(v.details==undefined){
            this.googleAPI
            .getBookBydetails(v?.title, v?.authors[0]?.name)
            .subscribe((resG) => {
              v.details = resG?.items[0];
              console.log(v.details);
            });
          }
        })
        // console.log(this.page_books);

        break;
      case 5:
        this.page_books = this.all_books.slice(48, 60);
        this.page_books.forEach((v:any)=>{
          if(v.details==undefined){
            this.googleAPI
            .getBookBydetails(v?.title, v?.authors[0]?.name)
            .subscribe((resG) => {
              v.details = resG?.items[0];
              console.log(v.details);
            });
          }
        })
        // console.log(this.page_books);

        break;

      default:
        break;
    }
  }
  // addGenre(){
  //   let modified_books:any = []
  //   this.all_books.map((v:any)=>{
  //     let data = v
  //     data.genre = this.genre
  //     modified_books.push(data)
  //   })
  //   console.log(modified_books);
  // }
}
