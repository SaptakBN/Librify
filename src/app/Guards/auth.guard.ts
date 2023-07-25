import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  if (sessionStorage.getItem('token') != null)
    return true;
  else {
    alert('You need to login first to visit this page');
    router.navigate(['sign-in'])
    return false;
  }
};
