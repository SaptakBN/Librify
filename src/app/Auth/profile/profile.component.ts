import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  token!:any
  userData!:any
  constructor(private authSer:AuthService){}
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')
    this.authSer.logIN(this.token).subscribe((res)=>{
      console.log(res);
      this.userData = res
    })
  }
}
