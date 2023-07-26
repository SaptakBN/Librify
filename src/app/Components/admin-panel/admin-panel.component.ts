import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users!:any
  constructor(private authSer:AuthService){}
  ngOnInit(): void {
    this.authSer.getAllUser().subscribe((res)=>{
      this.users = res
      console.log(this.users);
    })
  }
}
