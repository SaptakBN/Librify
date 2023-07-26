import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signUpForm!:FormGroup;
  constructor(private fb:FormBuilder, private authSer:AuthService){}
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
    let data = {
      fname:this.signUpForm.value.fname,
      lname:this.signUpForm.value.lname,
      mail:this.signUpForm.value.mail,
      pwd:this.signUpForm.value.pwd,
      id:this.signUpForm.value.mail,
      admin:false,
      img:this.base64textString,
      library:[],
      comics:[],
      review:[]
    }
    this.authSer.signUP(data).subscribe((res)=>{
      // console.log('response',res);
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
}
