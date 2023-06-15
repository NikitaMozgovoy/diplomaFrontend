import { HttpErrorResponse } from '@angular/common/http';
import {AfterContentInit, AfterViewInit, Component, OnInit, Output} from '@angular/core';
import { environment } from 'src/environments/environment';
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
}
