import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryjsonService } from 'src/app/Services/libraryjson.service';
import { ReqService } from 'src/app/Services/req.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-make-req',
  templateUrl: './make-req.component.html',
  styleUrls: ['./make-req.component.css'],
})
export class MakeReqComponent implements OnInit {
  req_form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private reqSer: ReqService,
    private storageSer: StorageService,
    private toast: ToastService,
    private libSer: LibraryjsonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.req_form = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });
  }
  onSubmit() {
    // console.log(this.req_form.value);
    let req_data = {
      fname: this.storageSer.get('fname'),
      lname: this.storageSer.get('lname'),
      mail: this.storageSer.get('mail'),
      title: this.req_form.value.title,
      author: this.req_form.value.author,
      state: 'pending',
    };
    this.reqSer.get_all_req().subscribe((allRes) => {
      let existingReq = allRes.filter((book) => book.title == req_data.title);
      if (existingReq.length != 0) {
        this.toast.toastWarn('This book has already been requested.');
      } else {
        let all_req = allRes.filter(
          (mail) => mail.mail == this.storageSer.get('mail')
        );
        if (all_req.length == 0) {
          this.reqSer.post_req(req_data).subscribe(
            (res) => {
              // console.log(res);
              this.toast.toastSuccess('Request has been sent');
              this.notify()
            },
            (err) => {
              // console.log(err);
            }
          );
        } else {
          let count: number = 0;
          all_req.map((v) => {
            if (v.state == 'pending') count++;
          });
          if (count == 0) {
            this.reqSer.post_req(req_data).subscribe(
              (res) => {
                console.log(res);
                this.toast.toastSuccess('Request has been sent');
                this.notify()
              },
              (err) => {
                // console.log(err);
              }
            );
          } else {
            this.toast.toastErr(
              'You have a request pending please wait for it to be resolved'
            );
          }
        }
      }
    });
  }
  loggedIn() {
    if (this.storageSer.getToken()) {
      return true;
    } else {
      this.toast.toastErr('User logged out');
      this.router.navigate(['sign-in']);
      return false;
    }
  }
  notify() {
    let count = 0;
    this.reqSer.get_all_req().subscribe((res) => {
      res.map((v) => {
        if (v.state == 'pending') count++;
      });
      localStorage.setItem('pen_req', String(count));
    });
  }
}
