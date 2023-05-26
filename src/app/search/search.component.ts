import {Component, OnInit, ViewChild} from '@angular/core';
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

  constructor(private filmService: FilmService, private route: ActivatedRoute, private searchService: SearchService){};
  ngOnInit() {
    this.getSearchResults();
  }

  getSearchResults(){
    this.route.queryParams.subscribe(params=>{
      this.filmService.getSearchResults("&name="+this.searchService.searchQuery, this.limit, params['page']).subscribe(
        {
          error: (err: HttpErrorResponse) => {alert(err.message)},
          next: (response: FilmsListDTO[]) => {this.films=response;}
        }
      );
      }
    )
  }
  filterSearchResults() {
    let filterString = this.composeQueryString();
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
    let res = this.searchService.searchQuery;
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
