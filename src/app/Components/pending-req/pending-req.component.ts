import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GoogleAPIService } from 'src/app/Services/google-api.service';
import { LibraryjsonService } from 'src/app/Services/libraryjson.service';
import { ReqService } from 'src/app/Services/req.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-pending-req',
  templateUrl: './pending-req.component.html',
  styleUrls: ['./pending-req.component.css'],
})
export class PendingReqComponent implements OnInit {
  addBook!: FormGroup;
  all_req!: any;
  currentreq!: any;
  req_books!: any;
  constructor(
    private reqSer: ReqService,
    private fb: FormBuilder,
    private googleSer: GoogleAPIService,
    private libSer: LibraryjsonService,
    private toast:ToastService
  ) {}
  ngOnInit(): void {
    this.reqSer.get_all_req().subscribe((res) => {
      // console.log(res);
      this.all_req = res;
    });
    this.addBook = this.fb.group({
      title: [''],
      author: [''],
    });
  }
  forReq(title: string, author: string, id: any) {
    this.reqSer.get_req(id).subscribe((res) => {
      this.currentreq = res;
    });
    this.addBook.value.title = title;
    this.addBook.value.author = author;
  }
  onSubmit() {
    // console.log(this.addBook.value);
    this.googleSer
      .openLibSearch(this.addBook.value.title, this.addBook.value.author)
      .subscribe((res) => {
        // console.log(res);
        this.req_books = res;
        // console.log(this.req_books);
      });
  }
  onGenre(el: HTMLSelectElement) {
    // console.log(el.value);
    this.currentreq.genre = el.value;
  }
  addToSite(cover: number, index: number) {
    let newBookData = this.req_books.docs[index];
    newBookData.cover_id = cover;
    console.log(this.req_books.docs[index]);
    this.googleSer
      .getBookBydetails(this.currentreq.title, this.currentreq.author)
      .subscribe((res) => {
        // console.log(res);
        newBookData.details = res.items[0];
        // console.log(newBookData);
        // console.log(this.currentreq);
        let data = {
          key: newBookData.key,
          title: newBookData.title,
          details: newBookData.details,
          authors: newBookData.author_name,
          cover_id: newBookData.cover_id,
          id: this.currentreq.id,
          genre: this.currentreq.genre,
          subject: newBookData.subject,
        };
        data.details.volumeInfo.authors = newBookData.author_name;
        // console.log(data);
        this.currentreq.state = 'granted';

        this.libSer
          .addNewBook_genre(this.currentreq.genre, data)
          .subscribe((resGen) => {
            // console.log(resGen);
            this.libSer
              .addNewBook_genre('allBooks', data)
              .subscribe((resAll) => {
                // console.log(resAll);
                this.toast.toastSuccess('Book has been added to catalogue.')
                this.reqSer
                  .edit_req(this.currentreq.id, this.currentreq)
                  .subscribe((resReq) => {
                    // console.log(resReq);
                    this.reqSer.get_all_req().subscribe((res) => {
                      // console.log(res);
                      this.all_req = res;
                    });
                  });
              });
          });
      });
  }
}
