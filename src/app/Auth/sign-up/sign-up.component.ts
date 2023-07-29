import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastService } from 'src/app/Services/toast.service';
import { v4 as uuid, v4 } from 'uuid';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signUpForm!:FormGroup;
  constructor(private fb:FormBuilder, private authSer:AuthService, private toaster:ToastService, private router:Router
    ){}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fname:['',[Validators.required]],
      lname:['',Validators.required],
      mail:['',[Validators.required]],
      pwd:['',[Validators.required]],
    })
  }
  signUP(){
    // console.log('form data',this.signUpForm.value);
    let token = uuid()
    let data = {
      fname:this.signUpForm.value.fname,
      lname:this.signUpForm.value.lname,
      mail:this.signUpForm.value.mail,
      pwd:this.signUpForm.value.pwd,
      token:token,
      id:token,
      admin:false,
      img:this.base64textString,
      library:[],
      comics:[],
      review:[]
    }
    this.authSer.getAllUser().subscribe(resAll=>{
      let allUser = resAll.filter(v=>v.mail==data.mail)
      if(allUser.length==0){
        this.authSer.signUP(data).subscribe((res)=>{
          // console.log('response',res);
        this.toaster.toastInfo('Registration successful. Please log in')
        this.router.navigate(['sign-in'])
        })
      }else{
        this.toaster.toastInfo('You are already registered please log in.')
        this.router.navigate(['sign-in'])
      }
    })
  }


base64textString:any;
onUploadChange(evt: any) {
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
}
handleReaderLoaded(e:any) {
  this.base64textString = ('data:image/png;base64,' + btoa(e.target.result));
}
genUUID(){
  console.log(uuid());
}
}
