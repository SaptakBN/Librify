import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private fb:FormBuilder, private toast:ToastService, private router:Router) { }
  contactForm!:FormGroup
  ngOnInit() {
    this.contactForm = this.fb.group({
      name:['',[Validators.required]],
      mail:['',[Validators.required]],
      msg:['',[Validators.required]]
    })
  }
  onSubmit(){
    if(this.contactForm.value.name!=''||this.contactForm.value.mail!=''||this.contactForm.value.msg!=''){
      this.toast.toastSuccess('Thank you for reaching us.')
      this.router.navigate(['home'])
    }else{
      this.toast.toastErr('Required field')
    }
  }
}
