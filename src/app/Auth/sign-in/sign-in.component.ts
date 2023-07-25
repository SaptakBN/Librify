import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignINComponent implements OnInit {
  userData!:any
  signINForm!:FormGroup
  constructor(private fb:FormBuilder, private authSer:AuthService, private storageSer:StorageService){}
  ngOnInit(): void {
    this.signINForm = this.fb.group({
      mail:['',[Validators.required]],
      pwd:['',[Validators.required]]
    })
  }
  signIN(){
    this.authSer.logIN(this.signINForm.value.mail).subscribe((res:any)=>{
      if(this.signINForm.value.pwd === res.pwd){
        this.userData = res
        console.log(this.userData.id);
        this.storageSer.set(this.userData.fname,this.userData.lname,this.userData.mail,this.userData.img)
      }
      else{
        alert('Password error')
      }
    })
  }
}
