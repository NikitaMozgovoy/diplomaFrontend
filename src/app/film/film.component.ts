import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import {FilmDTO} from "../dto/FilmDTO";
import {last} from "rxjs";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit{
  public film!: FilmDTO;
  public apiServerUrl! : string;
  constructor(private filmService: FilmService){};

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
    this.getFilm();
    console.log();
  }

  public getFilm(): void{
    this.filmService.getFilmById(Number(window.location.pathname.split("/")[2])).subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response: FilmDTO) => {
          this.film=response;
        }
      }
    )
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


  protected readonly last = last;
}
