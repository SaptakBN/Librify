import { style } from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ReqService } from 'src/app/Services/req.service';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  notification!: number;
  logo: string = 'assets/img/logo-dark.png';
  profile_img!: string | null;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    let navLink = document.querySelectorAll(
      '.nav-link, .navbar-brand'
    ) as NodeListOf<Element>;
    if (window.scrollY > element.clientHeight) {
      navLink.forEach((v) => v.classList.add('text-light'));
      element.classList.add('navbar-inverse');
      setTimeout(() => {
        this.logo = 'assets/img/logo-light.png';
      }, 100);
    } else {
      element.classList.remove('navbar-inverse');
      navLink.forEach((v) => v.classList.remove('text-light'));
      setTimeout(() => {
        this.logo = 'assets/img/logo-dark.png';
      }, 100);
    }
  }

  constructor(private storageSer: StorageService, private reqSer: ReqService) {}

  ngOnInit(): void {
    let count = 0;
    this.reqSer.get_all_req().subscribe((res) => {
      res.map((v) => {
        if (v.state == 'pending') count++;
      });
      this.notification = count;
    });
  }
  loggedIN() {
    if (this.storageSer.getToken()) {
      this.profile_img = this.storageSer.get('img');
      return true;
    } else {
      return false;
    }
  }
  admin() {
    this.notification = Number(this.storageSer.get('pen_req'))
    return this.storageSer.getAdmin();
  }
  logout() {
    this.storageSer.logout();
  }
  notify(){

  }
}
