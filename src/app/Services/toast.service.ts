import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast:ToastrService) { }
  toastSuccess(msg:string){
    this.toast.success(msg)
  }
  toastInfo(msg:string){
    this.toast.info(msg)
  }
  toastErr(msg:string){
    this.toast.error(msg)
  }
  toastWarn(msg:string){
    this.toast.warning(msg)
  }
}
