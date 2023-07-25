import { Component } from '@angular/core';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private storageSer:StorageService){}
  loggedIN(){
    if(this.storageSer.getToken()){
      return true
    }
    else{
      return false
    }
  }
  logout(){
    this.storageSer.logout()
  }
}
