import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PnfComponent } from './Components/pnf/pnf.component';
import { CategoryComponent } from './Components/category/category.component';
import { BookListComponent } from './Components/book-list/book-list.component';
import { BookDetailsComponent } from './Components/book-details/book-details.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { SignINComponent } from './Auth/sign-in/sign-in.component';
import { ProfileComponent } from './Auth/profile/profile.component';
import { LibraryComponent } from './Components/library/library.component';
import { authGuard } from './Guards/auth.guard';
import { MarvelComponent } from './Components/marvel/marvel.component';
import { ComicsComponent } from './Components/marvel/comics/comics.component';
import { ComicDetailsComponent } from './Components/marvel/comics/comic-details/comic-details.component';
import { AdminPanelComponent } from './Components/admin-panel/admin-panel.component';
import { MakeReqComponent } from './Components/make-req/make-req.component';
import { PendingReqComponent } from './Components/pending-req/pending-req.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'home/book-details/:category/:title', component:BookDetailsComponent},
  {path:'category',component:CategoryComponent},
  {path:'category/book-list/:category',component:BookListComponent},
  {path:'category/book-details/:category/:title',component:BookDetailsComponent},
  {path:'category/book-list/:category/book-details/:title',component:BookDetailsComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'sign-in',component:SignINComponent},
  {path:'profile',component:ProfileComponent, canActivate:[authGuard]},
  {path:'library',component:LibraryComponent,canActivate:[authGuard]},
  {path:'marvel',component:MarvelComponent},
  {path:'marvel/comics/:charID',component:ComicsComponent},
  {path:'marvel/comics/:charID/comic-details/:comicID',component:ComicDetailsComponent},
  {path:'admin-panel',component:AdminPanelComponent},
  {path:'make-req',component:MakeReqComponent},
  {path:'pending-req',component:PendingReqComponent},
  {path:'**',component:PnfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
