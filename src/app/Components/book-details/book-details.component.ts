import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { GoogleAPIService } from 'src/app/Services/google-api.service';
import { LibraryjsonService } from 'src/app/Services/libraryjson.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  description!: any;
  bookData!: any;
  genre!: any;
  book_title!: any;
  link!: any;
  token!: any;
  userData!: any;
  reviews: any[] = [];
  loader: boolean = false;

  constructor(
    private aroute: ActivatedRoute,
    private googleSer: GoogleAPIService,
    private authSer: AuthService,
    private storageSer: StorageService,
    private openLibrary: LibraryjsonService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.aroute.paramMap.subscribe((param) => {
      this.genre = param.get('category');
      this.book_title = param.get('title');
      // console.log(this.genre, this.book_title);
      this.openLibrary.carousel_books(this.genre).subscribe((res) => {
        this.bookData = res.find((book: any) => book.title == this.book_title);
        // console.log(this.bookData);

        if (this.bookData?.details?.volumeInfo?.description?.length > 800) {
          this.description =
            this.bookData?.details?.volumeInfo?.description.substr(0, 800);
          // console.log(this.description.length);
        }
        this.token = this.storageSer.getToken();
        if (this.token != null) {
          this.authSer.getSingleUser(this.token).subscribe((res) => {
            this.userData = res;
            // console.log(this.userData);
          });
        }
        this.authSer.getAllUser().subscribe((res) => {
          // console.log('all users',res);
          setTimeout(() => {
            this.loader = false;
          }, 2000);
          res.map((v: any) => {
            v.review.map((r: any) => {
              if (r.title == this.bookData?.details?.volumeInfo?.title) {
                let reviewData = {
                  fname: v.fname,
                  lname: v.lname,
                  mail: v.mail,
                  img: v.img,
                  review: r,
                };
                this.reviews.push(reviewData);
              }
            });
          });
          // console.log(this.reviews);
        });
      });
    });
  }
  inLibrary() {
    let token = this.storageSer.getToken();
    if (token != null) {
      let library: [] = this.userData?.library?.filter(
        (u: any) => u?.title === this?.bookData?.details?.volumeInfo?.title
      );
      if (library?.length == 0) {
        return library?.length;
      } else {
        return library?.length;
      }
    } else {
      return 0;
    }
  }
  addToLibrary() {
    let library: [] = this.userData?.library?.filter(
      (u: any) => u?.title === this?.bookData?.details?.volumeInfo?.title
    );
    let token = this.storageSer.getToken();
    // console.log(library);
    if (token != null) {
      if((this.userData.library.length+this.userData.comics.length)>=5){
        this.toast.toastWarn('Library book limit is 5.')
      }
      else{
        if (library.length == 0) {
          let bookInfo = this.bookData?.details?.volumeInfo;
          bookInfo.genre = this.genre;
          bookInfo.cover_id = this.bookData.cover_id;
          // console.log(bookInfo);
          this.userData.library.push(bookInfo);
          // console.log(this.userData);
          this.authSer
            .addToLibrary(this.token, this.userData)
            .subscribe((updatedRes) => {
              // console.log(updatedRes);
              this.toast.toastInfo(`${bookInfo.title} added to library`)
              this.toast.toastWarn(`${5-(this.userData.library.length+this.userData.comics.length)} choices remaining`)
            });
        } else {
        this.toast.toastWarn(`${this.bookData?.details?.volumeInfo.title} Book already exists in your library`)
        // alert('Book already exist');
          this.router.navigate(['/library']);
        }
      }
    }
    else {
      // alert('Log in to add this book to your library');
      this.toast.toastErr('Log in to add this book to your library')
    }
  }
  removeFromLibrary() {
    let index: number = -1;
    this.userData.library.map((v: any, i: any) => {
      if (v.title === this.bookData?.details?.volumeInfo.title) {
        index = i;
      }
    });
    // console.log('index',index);
    if (index >= 0) {
      this.userData.library.splice(index, 1);
      // console.log(this.userData);
      this.authSer.addToLibrary(this.token, this.userData).subscribe((res) => {
        // console.log(res);
        this.toast.toastWarn(`${this.bookData?.details?.volumeInfo.title} removed from your library`)
      });
    }
  }
  expand() {
    this.description = this.bookData?.details?.volumeInfo?.description;
  }
  collapse() {
    this.description = this.bookData?.details?.volumeInfo?.description.substr(
      0,
      800
    );
  }
}
