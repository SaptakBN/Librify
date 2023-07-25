import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { GoogleAPIService } from 'src/app/Services/google-api.service';
import { LibraryjsonService } from 'src/app/Services/libraryjson.service';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  description!:any
  bookData!:any;
  genre!:any;
  book_title!:any;
  link!:any;
  token!:any;
  userData!:any;
  reviews:any[] = []

  constructor(private aroute:ActivatedRoute, private googleSer:GoogleAPIService, private authSer:AuthService,
    private storageSer:StorageService, private openLibrary: LibraryjsonService, private router:Router){}

  ngOnInit(): void {

    this.aroute.paramMap.subscribe((param)=>{
      this.genre = param.get('category')
      this.book_title = param.get('title')
      // console.log(this.genre, this.book_title);
      this.openLibrary.carousel_books(this.genre).subscribe((res)=>{
        this.bookData = res.find((book:any)=>book.title==this.book_title)
        // console.log(this.bookData);

        if(this.bookData?.details?.volumeInfo?.description.length>800){
          this.description = this.bookData?.details?.volumeInfo?.description.substr(0, 800)
          // console.log(this.description.length);
        }
        this.token = this.storageSer.getToken()
          if(this.token!=null){
            this.authSer.logIN(this.token).subscribe((res)=>{
              this.userData = res
              // console.log(this.userData);
            })
          }
            this.authSer.getAllUser().subscribe(res=>{
              // console.log('all users',res);
              res.map((v:any)=>{
                v.review.map((r:any)=>{
                  if( r.title == this.bookData?.details?.volumeInfo?.title ){
                    let reviewData = {
                      fname:v.fname,
                      lname:v.lname,
                      mail:v.mail,
                      review:r
                    }
                    this.reviews.push(reviewData)
                  }
                })
              })
              // console.log(this.reviews);

            })
      })
    })

  }
  inLibrary(){
    let token = this.storageSer.getToken()
    if(token!=null){
      let library:[] = this.userData?.library?.filter((u:any)=>u?.title === this?.bookData?.details?.volumeInfo?.title)
      if(library?.length == 0){
        return library?.length
      }
      else{
        return library?.length
      }
    }
    else{
      return 0
    }
  }

  addToLibrary(){
    let library:[] = this.userData?.library?.filter((u:any)=>u?.title === this?.bookData?.details?.volumeInfo?.title)
    let token = this.storageSer.getToken()
    // console.log(library);
    if(token!=null){
      if(library.length == 0){
        let bookInfo = this.bookData?.details?.volumeInfo
        bookInfo.genre = this.genre
        bookInfo.cover_id = this.bookData.cover_id
        console.log(bookInfo);

        this.userData.library.push(bookInfo)
        // console.log(this.userData);
        this.authSer.addToLibrary(this.token, this.userData).subscribe((updatedRes)=>{
          // console.log(updatedRes);
        })
      }
      else{
        alert('Book already exist');
      }
    }
    else{
      alert('Log in to add this book to your library')
      this.router.navigate(['/sign-in'])
    }
  }
  removeFromLibrary(){
    let index:number=-1;
    this.userData.library.map((v:any, i:any)=>{
      if( v.title === this.bookData?.details?.volumeInfo.title ){
        index = i
      }
    })
    // console.log('index',index);
    if(index>=0){
      this.userData.library.splice(index,1)
      // console.log(this.userData);
      this.authSer.addToLibrary(this.token, this.userData).subscribe((res)=>{
        // console.log(res);
      })
    }
  }
  expand(){
    this.description = this.bookData?.details?.volumeInfo?.description
  }
  collapse(){
    this.description = this.bookData?.details?.volumeInfo?.description.substr(0, 800)
  }

}
