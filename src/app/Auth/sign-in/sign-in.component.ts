import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignINComponent implements OnInit {
  userData!: any;
  signINForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authSer: AuthService,
    private storageSer: StorageService,
    private toaster: ToastService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.signINForm = this.fb.group({
      mail: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }
  signIN() {
    this.authSer.logIN(this.signINForm.value.mail).subscribe((res: any) => {
      if (this.signINForm.value.pwd === res.pwd) {
        this.userData = res;
        // console.log(this.userData.admin);
        this.storageSer.set(
          this.userData.fname,
          this.userData.lname,
          this.userData.mail,
          this.userData.img,
          this.userData.admin
        );
        this.toaster.toastSuccess('Logged in succesfully');
        this.router.navigate(['/profile'])
      }
      else {
        this.toaster.toastErr('Password Error');
        // alert('Password error')
      }
    });
  }
}
