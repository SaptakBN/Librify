import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReqService } from 'src/app/Services/req.service';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-make-req',
  templateUrl: './make-req.component.html',
  styleUrls: ['./make-req.component.css']
})
export class MakeReqComponent implements OnInit {
  req_form!:FormGroup
  constructor(private fb:FormBuilder, private reqSer:ReqService, private storageSer:StorageService){}

  ngOnInit(): void {
    this.req_form = this.fb.group({
      title:['',[Validators.required]],
      author:['',[Validators.required]],
    })
  }
  onSubmit(){
    // console.log(this.req_form.value);
    let req_data = {
      id:this.storageSer.getToken(),
      fname:this.storageSer.get('fname'),
      lname:this.storageSer.get('lname'),
      mail:this.storageSer.getToken(),
      title:this.req_form.value.title,
      author:this.req_form.value.author,
      state:'pending',
    }
    this.reqSer.post_req(req_data).subscribe((res)=>{
      // console.log(res);
    })
  }

}
