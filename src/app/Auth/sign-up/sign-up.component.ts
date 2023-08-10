import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  errMsg!:string
  signUpForm!:FormGroup;
  show: string = '&#xf06e;';
  hide: string = '&#xf070;';
  password: string = 'password';
  cpassword: string = 'password';
  button: string = this.show;
  cbutton: string = this.show;
  constructor(private fb:FormBuilder, private authSer:AuthService, private toaster:ToastService, private router:Router
    ){}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fname:['',[Validators.required,Validators.pattern('^[A-Z]{1}[a-z]{1,9}$')]],
      lname:['',[Validators.required,Validators.pattern('^[A-Z]{1}[a-z]{1,9}$')]],
      mail:['',[Validators.required,Validators.email]],
      pwd:['',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[&@#*~`!$%^])(?=.*[0-9])(?=.*[a-z]).{8,12}$')]],
      cpwd:['',[Validators.required]],

    })
  }
  signUP(){
    if(this.errMsg===''){
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
    }else this.toaster.toastErr('Password Mismatch')
  }
  passwordConforming(){
    if(this.signUpForm.value.cpwd!='' && this.signUpForm.value.pwd!=this.signUpForm.value.cpwd){
      this.errMsg = 'Password mismatch'
    }
    else{
      this.errMsg = ''
    }
  }
  show_password(field:string) {
    switch (field) {
      case 'pwd':
        if (this.button == this.show) {
          this.button = this.hide;
          this.password = 'text';
          setTimeout(() => {
            this.password = 'password';
            this.button = this.show;
          }, 5000);
        } else if (this.button == this.hide) {
          this.button = this.show;
          this.password = 'password';
        }
        break;
      case 'cpwd':
        if (this.cbutton == this.show) {
          this.cbutton = this.hide;
          this.cpassword = 'text';
          setTimeout(() => {
            this.cpassword = 'password';
            this.cbutton = this.show;
          }, 5000);
        } else if (this.cbutton == this.hide) {
          this.cbutton = this.show;
          this.cpassword = 'password';
        }
        break;

      default:
        break;
    }

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
