import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MarvelService } from 'src/app/Services/marvel.service';
import { StorageService } from 'src/app/Services/storage.service';
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
  userData!:any
  constructor(private aroute: ActivatedRoute, private marvelSer:MarvelService, private storageSer:StorageService, private authSer:AuthService){}
  ngOnInit(): void {
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
      this.authSer.logIN(token).subscribe((res)=>{
        // console.log(res);
        this.userData = res;
        if(this.userData.comics!=undefined || this.userData.comics.length!=0){
          let comicMatch = this.userData.comics.filter((v:any)=>v.title==this.comicData.title)
          // console.log(comicMatch.length);
          // console.log(this.userData.comics.length);

          if(comicMatch.length==0){
            this.userData.comics.push(this.comicData)
            // console.log(this.userData?.comics);
            this.authSer.addToLibrary(token, this.userData).subscribe(postRes=>{
              // console.log('book added', postRes);
            })
        }
        else{
          alert('This comic is alreary in your Library')
        }
        }
        else{
          // this.userData.comics.push(this.comicData)
          alert('push book')
          this.userData.comics.push(this.comicData)
            console.log(this.userData?.comics);
            this.authSer.addToLibrary(token, this.userData).subscribe(postRes=>{
              console.log('book added', postRes);
            })
        }
      })
    }
    else{
      alert('Log in to add this comics to your library')
    }
  }
  removeFromLibrary(){
    let token = this.storageSer.getToken()
    if(token!=null){
      this.authSer.logIN(token).subscribe(res=>{
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
}
