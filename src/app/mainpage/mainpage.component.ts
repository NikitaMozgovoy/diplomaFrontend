import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import {FilmService} from '../services/film.service';
import {FilmsListDTO} from "../dto/FilmsListDTO";
import genres from "src/assets/genres.json";
import years from "src/assets/years.json";
import types from "src/assets/types.json";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  public films!: FilmsListDTO[];
  public apiServerUrl!: string;
  genresFilter:any;
  yearsFilter:any;
  typesFilter:any;
  public limit = 10;
  public page=1;
  public pagesQuantity! : number;


  constructor(private filmService: FilmService) {
  };

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
    this.genresFilter = genres;
    this.yearsFilter = years;
    this.typesFilter = types;
    this.getFilms(this.limit, this.page);
  }

  public getFilms(limit:number, pageNumber: number): void {
    this.filmService.getFilms(limit, pageNumber).subscribe(
      {
        error: (err: HttpErrorResponse) => {
          alert(err.message)
        },
        next: (response: FilmsListDTO[]) => {
          this.limit = limit;
          this.films = response;
        }
      }
    )
    this.getPagesQuantity("null");
  }

  public getPagesQuantity(query:string): void{
    this.filmService.getFilmsPagesQuantity(query, this.limit).subscribe(
      {
        error: (err: HttpErrorResponse) => {
          alert(err.message)
        },
        next: (response: number) => {
          this.pagesQuantity = response;
        }
      }
    )
  }

  applyFilters() {
    let filterString = this.composeQueryString();
    this.filmService.getSearchResults(filterString, this.limit, 1).subscribe(
      {
        error: (err: HttpErrorResponse) => {
          alert(err.message)
        },
        next: (response: FilmsListDTO[]) => {
          this.films = response;
        }
      }
    )
    this.getPagesQuantity(filterString);
  }


  composeQueryString() {
    let res = "";
    for (let filter of [this.typesFilter, this.genresFilter, this.yearsFilter]) {
      let map = new Map(Object.entries(filter));
      for (let key of map.keys()) {
        // @ts-ignore
        if (map.get(key)?.value == true) {
          // @ts-ignore
          res += ("&" + map.get("paramName")  + "=" + map.get(key)?.name);
        }
      }
    }
    return res;
  }

  resetFilters(){
    this.genresFilter = genres;
    this.yearsFilter = years;
    this.typesFilter = types;
    this.getFilms(this.limit, this.page);
    location.reload();
  }

}

