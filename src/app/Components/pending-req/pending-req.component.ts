import { Component, OnInit } from '@angular/core';
import { ReqService } from 'src/app/Services/req.service';

@Component({
  selector: 'app-pending-req',
  templateUrl: './pending-req.component.html',
  styleUrls: ['./pending-req.component.css']
})
export class PendingReqComponent implements OnInit{
  all_req!:any
  constructor(private reqSer:ReqService){}
  ngOnInit(): void {
    this.reqSer.get_all_req().subscribe((res)=>{
      // console.log(res);
      this.all_req = res
    })
  }
}
