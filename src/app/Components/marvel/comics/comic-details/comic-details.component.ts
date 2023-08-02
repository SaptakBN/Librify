import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MarvelService } from 'src/app/Services/marvel.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.css']
})
export class ComicDetailsComponent implements OnInit {
  public_key:string = '744c369075a2d8a6cdc39dd3c2e9b22b'
  private_key:string = 'd9843fb3d61663e6a72679a8cce7bc9f6d0a9c0b'
  comicID!:string | null
  comicData!:any;
  modal_img!:any;
  userData!:any;
  reviews:any[]=[];
  loader:boolean = false
  hero_comics!:any
  constructor(private aroute: ActivatedRoute, private marvelSer:MarvelService, private storageSer:StorageService, private authSer:AuthService, private toast: ToastService){}
  ngOnInit(): void {
    this.loader = true
    this.aroute.paramMap.subscribe(param=>{
      this.comicID = param.get('comicID')
      // console.log(this.comicID);
      let date = Date.now();
      let md5 = new Md5();
      let hash = md5.appendStr(`${date}${this.private_key}${this.public_key}`).end()
      // console.log(date, hash);
      this.marvelSer.getComicByID(date, hash, this.comicID).subscribe((res)=>{
        // console.log(res.data.results);
        this.comicData = res.data.results[0]
        // console.log(this.comicData);
        let token = this.storageSer.getToken()
        if(token)
        this.authSer.getSingleUser(token).subscribe((singleRes)=>{
          this.userData = singleRes
        })
          this.authSer.getAllUser().subscribe((allRes)=>{
            allRes.map((v:any)=>{
              v.review.map((d:any)=>{
                if(d.title == this.comicData.title){
                    let reviewData = {
                      fname:v.fname,
                      lname:v.lname,
                      mail:v.mail,
                      review:d.review,
                      img:v.img
                    }
                    this.reviews.push(reviewData)
                    // console.log(reviewData);
                }
              })
              // console.log(this.reviews);
            })
            setTimeout(() => {
              this.loader = false
            }, 2000);
          })
      })
    })
  }
  modalImg(path:string, extension:string){
    this.modal_img = path+'.'+extension
    // console.log(this.modal_img);
  }
  addToLibrary(){
    let token = this.storageSer.getToken()
    if(token!=null){
      this.authSer.getSingleUser(token).subscribe((res)=>{
        // console.log(res);
        this.userData = res;
        if((this.userData.library.length+this.userData.comics.length)>=5){
          this.toast.toastWarn('Library limit reached')
        }else{
          if(this.userData.comics!=undefined || this.userData.comics.length!=0){
            let comicMatch = this.userData.comics.filter((v:any)=>v.title==this.comicData.title)
            // console.log(comicMatch.length);
            // console.log(this.userData.comics.length);

            if(comicMatch.length==0){
              this.userData.comics.push(this.comicData)
              // console.log(this.userData?.comics);
              this.authSer.addToLibrary(token, this.userData).subscribe(postRes=>{
                // console.log('book added', postRes);
                this.toast.toastSuccess('Comic has been added to your library')
                this.toast.toastWarn(`${5-(this.userData.library.length+this.userData.comics.length)} choices remaining`)
              })
          }
          else{
            this.toast.toastWarn('This comic is alreary in your Library')
          }
          }
          else{
            // this.userData.comics.push(this.comicData)
            // alert('push book')
            // this.userData.comics.push(this.comicData)
              console.log(this.userData?.comics);
              this.authSer.addToLibrary(token, this.userData).subscribe(postRes=>{
                // console.log('book added', postRes);
                this.toast.toastSuccess('Comic has been added to your library')
                this.toast.toastWarn(`${5-(this.userData.library.length+this.userData.comics.length)} choices remaining`)
              })
          }
        }
      })
    }
    else{
      this.toast.toastErr('Log in to add this comics to your library')
    }
  }
  removeFromLibrary(){
    let token = this.storageSer.getToken()
    if(token!=null){
      this.authSer.getSingleUser(token).subscribe(res=>{
        this.userData = res
        this.userData.comics.map((v:any , i:any )=>{
          if(v.title==this.comicData.title){
            this.userData.comics.splice(i, 1);
            this.authSer.addToLibrary(token, this.userData).subscribe(postRes=>{
              // console.log(postRes);
            })
          }
        })
      })
    }
  }
  inLibrary(){
    let present = false
    let token = this.storageSer.getToken()
    if(token!=null){
      this.userData?.comics?.map((v:any)=>{
        if(this.comicData.title == v.title){
          present = true
        }
      })
      return present
    }
    else{
      return present
    }
  }
}
