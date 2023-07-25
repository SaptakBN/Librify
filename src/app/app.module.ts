import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  { HttpClientModule } from '@angular/common/http'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
