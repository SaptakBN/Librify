import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userData!:any
  constructor(private authSer:AuthService, private storageSer:StorageService, private toast:ToastService, private router:Router
     ){}
  ngOnInit(): void {
    let token = this.storageSer.getToken()
    if(token){
      this.authSer.logIN(token).subscribe((res)=>{
        // console.log(res);
        this.userData = res
      })
    }
  }
  logOut(){
    this.storageSer.logout()
    this.toast.toastErr('User logged out')
    this.router.navigate(['sign-in'])
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
