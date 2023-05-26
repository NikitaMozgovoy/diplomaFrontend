import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/UserModel';
import { FilmService } from '../services/film.service';
import { UserService } from '../services/user.service';
import {FilmDTO} from "../dto/FilmDTO";
import {FilmsListDTO} from "../dto/FilmsListDTO";
import genres from "src/assets/genres.json";
import years from "src/assets/years.json";
import types from "src/assets/types.json";

import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  public films!: FilmsListDTO[];
  public apiServerUrl!: string;
  genresFilter = genres;
  yearsFilter = years;
  typesFilter = types;
  public page=1;
  public limit = 10;


  constructor(private filmService: FilmService) {
  };

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
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
  }

  applyFilters() {
    let filterString = this.composeQueryString();
    console.log(filterString);
    this.filmService.getSearchResults(filterString, this.limit, 1).subscribe(
      {
        error: (err: HttpErrorResponse) => {
          alert(err.message)
        },
        next: (response: FilmsListDTO[]) => {
          this.films = response;
          console.log(response)
        }
      }
    )
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
}
