import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CustomUser } from '../models/customUser';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit{
  public film!: Film;
  public apiServerUrl! : string;
  public filmUrl!: string;
  constructor(private filmService: FilmService, private router: Router){};

  ngOnInit(): void {
    this.filmUrl=window.location.pathname.split("/")[2];
    this.apiServerUrl = environment.apiBaseUrl;
    this.getFilm();
  }

  public getFilm(): void{
    // this.filmService.getFilmByUrl(this.filmUrl).subscribe(
    //   {
    //     error: (err: HttpErrorResponse) => {alert(err.message)},
    //     next: (response: Film) => {this.film=response}
    //   }
    // )
    this.filmService.getFilmByUrl(this.filmUrl).subscribe(
    (response: Film) => {
      this.film=response;
    },
    (error: HttpErrorResponse) =>{
      alert(error.message);
    });
  }

  public openModal(film: Film, mode: string): void{
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type="button";
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode==='edit'){
      button.setAttribute('data-target', '#editModal');
    }
    if (mode==='delete'){
      button.setAttribute('data-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }

   public onUpdate(editForm: NgForm, filmId: number) :void {
    this.filmService.updateFilm(editForm.value, filmId).subscribe(
      (response: Film) => {
        console.log(response);
        this.getFilm();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
    setTimeout(()=>window.location.replace(window.location.href.split("/").slice(0, -1).join("/")+"/"+editForm.value["url"]), 400);
  }

public onDelete(filmId: number):void{
    this.filmService.deleteFilm(filmId).subscribe(
      {
        next: (response: void) => {window.location.replace(window.location.protocol+"//"+window.location.host)},
        error: (err: HttpErrorResponse) => {alert(err.message)}
      }
    )
}

}
