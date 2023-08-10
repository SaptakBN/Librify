import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent {
  userData!:any
  constructor(private authSer:AuthService, private storageSer:StorageService, private toast:ToastService, private router:Router
     ){}
  ngOnInit(): void {
    let token = this.storageSer.getToken()
    if(token){
      this.authSer.getSingleUser(token).subscribe(res=>{
        this.userData = res
        console.log(this.userData);
      })
    }
  }
}
