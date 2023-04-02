import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FilmComponent } from './film/film.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path:"", component: MainpageComponent},
  {path:"films/:filmUrl", component:FilmComponent},
  {path:"signup", component:SignupComponent},
  {path:"signin", component:SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
