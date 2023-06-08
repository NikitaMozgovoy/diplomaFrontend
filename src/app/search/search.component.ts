import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../app.component";
import {FilmService} from "../services/film.service";
import {FilmsListDTO} from "../dto/FilmsListDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {FilmDTO} from "../dto/FilmDTO";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search.service";
import genres from "../../assets/genres.json";
import years from "../../assets/years.json";
import types from "../../assets/types.json";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  public films!: FilmsListDTO[];
  genresFilter = genres;
  yearsFilter = years;
  typesFilter = types;
  public page=1;
  public limit = 10;
  public pagesQuantity!: number;

  constructor(private filmService: FilmService, private route: ActivatedRoute){};
  ngOnInit() {
    // @ts-ignore
    SearchService.searchQuery = sessionStorage.getItem("searchQuery");
    this.getSearchResults();
    // @ts-ignore
    this.getPagesQuantity(sessionStorage.getItem("searchQuery"));
    console.log(this.pagesQuantity);
  }

  getSearchResults() {
    let filterString = this.composeQueryString();
    // @ts-ignore
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
  }

  onSearchSubmit(){
    this.getSearchResults();
  }


  composeQueryString() {
    let res = sessionStorage.getItem("searchQuery");
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
    this.getSearchResults();
    location.reload();
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
}
