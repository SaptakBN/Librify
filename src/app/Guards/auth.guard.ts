import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '../Services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let toast = inject(ToastService)
  if (sessionStorage.getItem('token') != null)
    return true;
  else {
    // alert('You need to login first to visit this page');
    toast.toastErr('You need to login first to visit this page')
    router.navigate(['sign-in'])
    return false;
  }
};
