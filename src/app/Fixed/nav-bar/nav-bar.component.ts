import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private storageSer:StorageService, private authSer:AuthService){}
  loggedIN(){
    if(this.storageSer.getToken()){
      return true
    }
    else{
      return false
    }
  }
  admin(){
    return this.storageSer.getAdmin()
  }
  logout(){
    this.storageSer.logout()
  }
}
