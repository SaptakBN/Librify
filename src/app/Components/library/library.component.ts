import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    // console.log(this.modal);

  }
  reviewBookData!: any;
  reviewData!: any;
  reviewForTitle!: any;
  userData!: any;
  reviewType!: any;
  constructor(
    private authSer: AuthService,
    private storageSer: StorageService,
    private toast:ToastService,
    private router:Router
    ) {}
  ngOnInit(): void {
    let token = sessionStorage.getItem('token');
    if (token != null) {
      this.authSer.getSingleUser(token).subscribe((userRes) => {
        this.userData = userRes;
        // console.log(this.userData);
      });
    }
  }
  remove(title: string, type: string) {
    // console.log(title, type);

    let index;
    let token = this.storageSer.getToken();
    switch (type) {
      case 'book':
        this.userData?.library.map((v: any, i: number) => {
          if (v.title == title) {
            index = i;
          }
        });
        this.userData.library.splice(index, 1);
        if (token != null) {
          this.authSer.addToLibrary(token, this.userData).subscribe((res) => {
            // console.log(res);
            this.toast.toastErr('This book has been removed from your library')
          });
        }
        break;
      case 'comic':
        this.userData?.comics.map((v: any, i: number) => {
          if (v.title == title) {
            index = i;
          }
        });
        this.userData.comics.splice(index, 1);
        if (token != null) {
          this.authSer.addToLibrary(token, this.userData).subscribe((res) => {
            // console.log(res);
            this.toast.toastErr('This comic has been removed from your library')
          });
        }
        break;

      default:
        break;
    }
  }
  saveReview() {
    if (this.reviewData != '') {
      switch (this.reviewType) {
        case 'book':
          this.userData.library.map((v: any) => {
            if (v.title == this.reviewForTitle) {
              let data = {
                title: this.reviewForTitle,
                review: this.reviewData,
                type: this.reviewType,
              };
              let token = this.storageSer.getToken();
              if (token != null) {
                let reviews = this.userData.review.filter(
                  (d: any) => d.title == this.reviewForTitle
                );
                if (reviews.length == 0) {
                  this.userData.review.push(data);
                  this.authSer
                    .addToLibrary(token, this.userData)
                    .subscribe((res) => {
                      // console.log(res);
                      this.toast.toastSuccess('Your review has been registered')
                    });
                }
              }
            }
          });
          break;
        case 'comic':
          this.userData.comics.map((v: any) => {
            if (v.title == this.reviewForTitle) {
              let data = {
                title: this.reviewForTitle,
                review: this.reviewData,
                type: this.reviewType,
              };
              let token = this.storageSer.getToken();
              if (token != null) {
                let reviews = this.userData.review.filter(
                  (d: any) => d.title == this.reviewForTitle
                );
                if (reviews.length == 0) {
                  this.userData.review.push(data);
                  this.authSer
                    .addToLibrary(token, this.userData)
                    .subscribe((res) => {
                      // console.log(res);
                        this.toast.toastSuccess('Your review has been registered')
                    });
                }
              }
            }
          });
          break;

        default:
          break;
      }
    }else{
      this.toast.toastWarn('Review not registered')
    }
  }
  updateReview() {
    if (this.reviewData != '') {
      this.userData.review.map((v: any) => {
        if (v.title == this.reviewForTitle) {
          let token = this.storageSer.getToken();
          if (token != null) {
            v.review = this.reviewData;
            // console.log(this.userData);
            this.authSer.addToLibrary(token, this.userData).subscribe((res) => {
              // console.log(res);
              this.toast.toastSuccess('Your review has been updated')
            });
          }
        }
      });
    }else this.toast.toastWarn('Review not registered')
  }
  deleteReview(title: string, type: string) {
    let token = this.storageSer.getToken();
    if (token != null) {
      this.userData.review.map((v: any, i: number) => {
        if (v.title == title) {
          this.userData.review.splice(i, 1);
          // console.log(this.userData);
          this.authSer.addToLibrary(token, this.userData).subscribe((res) => {
            // console.log(res);
            this.reviewData = '';
            this.toast.toastSuccess('Your review has been deleted')
          });
        }
      });
    }
  }
  reviewOrNot(title: string) {
    let bool = false;
    this.userData.review.map((v: any) => {
      if (v.title == title) {
        bool = true;
      }
    });
    return bool;
  }
  reviewFor2(title: string, type: string) {
    let reviewPresent = false;
    this.reviewType = type;
    this.reviewForTitle = title;
    let token = this.storageSer.getToken();
    if (token != null){
      switch (type) {
        case 'book':
          this.reviewBookData = this.userData.library.filter(
            (d: any) => title == d.title
          );
          // console.log(this.reviewBookData[0].cover_id);
          break;
        case 'comic':
          this.reviewBookData = this.userData.comics.filter(
            (d: any) => title == d.title
          );
          // console.log(this.reviewBookData);
          break;

        default:
          break;
      }
      this.authSer.getSingleUser(token).subscribe((res) => {
        this.userData = res;
        this.userData.review.map((v: any) => {
          if (v.title == this.reviewForTitle) {
            this.reviewData = v.review;
            reviewPresent = true;
          }
        });
        if (reviewPresent == false) {
          this.reviewData = '';
        }
      });
    }
  }
  loggedIn(){
    if(this.storageSer.getToken()){
      return true
    }
    else{
      this.toast.toastErr('User logged out')
      this.router.navigate(['sign-in'])
      return false
    }
  }
}
