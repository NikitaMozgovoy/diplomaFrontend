import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import {FilmService} from '../services/film.service';
import {FilmsListDTO} from "../dto/FilmsListDTO";
import genres from "src/assets/genres.json";
import types from "src/assets/types.json";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  public films!: FilmsListDTO[];
  public apiServerUrl!: string;
  genresFilter:any;
  typesFilter:any;
  // @ts-ignore
  public limit: number;
  // @ts-ignore
  public page: number;
  public pagesQuantity! : number;
  public query!: string;
  public yearStart!: string | null;
  public yearEnd!: string | null;


  constructor(private filmService: FilmService, private route: ActivatedRoute) {
  };

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
    this.query="";
    this.page=1;
    this.limit=10;
    sessionStorage.setItem("yearStart","");
    sessionStorage.setItem("yearEnd","");
    this.genresFilter = genres;
    this.typesFilter = types;
    this.yearStart = sessionStorage.getItem("yearStart");
    this.yearEnd = sessionStorage.getItem("yearEnd");
    this.route.queryParams.subscribe(params=>{
      if(params['query']!="" && params['query']){
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
    this.getPagesQuantity(filterString);
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
    this.filmService.getSearchResults(filterString, this.limit, 1).subscribe(
      {
        error: (err: HttpErrorResponse) => {
          alert(err.message)
        },
        next: (response: FilmsListDTO[]) => {
          this.films = response;
          // @ts-ignore
          sessionStorage.setItem("yearStart", this.yearStart);
          // @ts-ignore
          sessionStorage.setItem("yearEnd", this.yearEnd);
        }
      }
    )
    this.getPagesQuantity(filterString);
  }

  composeQueryString(query: string) {
    let res = query;
    let map: Map<string, Map<string, Map<string, string>>> = new Map;
    for (let filter of [this.genresFilter, this.typesFilter]) {
      map = new Map(Object.entries(filter));
      for (let [key, value] of map) {
        // @ts-ignore
        if ((map.get(key))?.value === true) {
          // @ts-ignore
          res += ("&" + map.get("paramName")  + "=" + map.get(key)?.name);
        }
      }
    }
    if(this.yearStart!="" && this.yearEnd=="") {
      res += "&year=" + this.yearStart;
    }
    else if(this.yearStart=="" && this.yearEnd!=""){
      res+= "&year=" + this.yearEnd;
    }
    else if(this.yearStart!="" && this.yearEnd!=""){
      res+= "&year=" + this.yearStart + "-" + this.yearEnd;
    }
    return res;
  }

  resetFilters(){
    this.yearStart="";
    this.yearEnd="";
    sessionStorage.setItem("yearStart", this.yearEnd);
    sessionStorage.setItem("yearEnd", this.yearEnd);
    this.applyFilters();
  }

}

