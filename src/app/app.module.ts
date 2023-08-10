import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Fixed/nav-bar/nav-bar.component';
import { FooterComponent } from './Fixed/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { PnfComponent } from './Components/pnf/pnf.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryComponent } from './Components/category/category.component';
import { GenreComponent } from './Components/category/genre/genre.component';
import { BookListComponent } from './Components/book-list/book-list.component';
import { BookDetailsComponent } from './Components/book-details/book-details.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { SignINComponent } from './Auth/sign-in/sign-in.component';
import { ProfileComponent } from './Auth/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibraryComponent } from './Components/library/library.component';
import { MarvelComponent } from './Components/marvel/marvel.component';
import { ComicsComponent } from './Components/marvel/comics/comics.component';
import { DollarToInrPipe } from './Pipes/dollar-to-inr.pipe';
import { ComicDetailsComponent } from './Components/marvel/comics/comic-details/comic-details.component';
import { AdminPanelComponent } from './Components/admin-panel/admin-panel.component';
import { MakeReqComponent } from './Components/make-req/make-req.component';
import { PendingReqComponent } from './Components/pending-req/pending-req.component';
import { ToastrModule } from 'ngx-toastr';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { MyReviewsComponent } from './Auth/my-reviews/my-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    PnfComponent,
    CategoryComponent,
    GenreComponent,
    BookListComponent,
    BookDetailsComponent,
    SignUpComponent,
    SignINComponent,
    ProfileComponent,
    LibraryComponent,
    MarvelComponent,
    ComicsComponent,
    DollarToInrPipe,
    ComicDetailsComponent,
    AdminPanelComponent,
    MakeReqComponent,
    PendingReqComponent,
    ContactUsComponent,
    MyReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      progressBar:true,
      timeOut:4000,
      progressAnimation:'decreasing',
      positionClass:'toast-top-right',
      preventDuplicates:true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
