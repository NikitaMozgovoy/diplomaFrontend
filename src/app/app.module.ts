import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';
import { FilmComponent } from './film/film.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ReviewComponent } from './review/review.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {NgOptimizedImage} from "@angular/common";
import { ProfileComponent } from './profile/profile.component';
import {EventEmitterService} from "./services/event-emitter.service";

@NgModule({
  declarations: [
    AppComponent,
    FilmComponent,
    MainpageComponent,
    ReviewComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgOptimizedImage
    ],
  providers: [
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
