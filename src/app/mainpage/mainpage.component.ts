import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import {FilmService} from '../services/film.service';
import {FilmsListDTO} from "../dto/FilmsListDTO";
import genres from "src/assets/genres.json";
import years from "src/assets/years.json";
import types from "src/assets/types.json";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search.service";

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
  public query!: string;


  constructor(private filmService: FilmService, private route: ActivatedRoute) {
  };

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
    this.query="";
    this.genresFilter = genres;
    this.yearsFilter = years;
    this.typesFilter = types;
    this.route.queryParams.subscribe(params=>{
      if(params['query']!="" && params['query']){
        console.log("зашел")
        // @ts-ignore
        this.query=sessionStorage.getItem("searchQuery");
        // @ts-ignore
        SearchService.searchQuery = sessionStorage.getItem("searchQuery");
      }
      this.getSearchResults(this.query, this.page);
    })
  }


  getSearchResults(query: string, pageNumber: number) {
    let filterString = this.composeQueryString(query);
    console.log(filterString);
    // @ts-ignore
    this.filmService.getSearchResults(filterString, this.limit, pageNumber).subscribe(
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
    let filterString = this.composeQueryString(this.query);
    console.log(this.query);
    console.log(filterString);
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

  composeQueryString(res: string) {
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
    console.log(res);
    return res;
  }

  resetFilters(){
    this.genresFilter = genres;
    this.yearsFilter = years;
    this.typesFilter = types;
    this.getSearchResults(this.query, 1);
    location.reload();
  }


}

