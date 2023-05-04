import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../app.component";
import {FilmService} from "../services/film.service";
import {FilmsListDTO} from "../dto/FilmsListDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {FilmDTO} from "../dto/FilmDTO";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  public films!: FilmsListDTO[];

  constructor(private filmService: FilmService, private route: ActivatedRoute, private searchService: SearchService){};
  ngOnInit() {
    this.getSearchResults();
  }

  getSearchResults(){
    this.route.queryParams.subscribe(params=>{
      this.filmService.getSearchResults(this.searchService.searchQuery, params['page']).subscribe(
        {
          error: (err: HttpErrorResponse) => {alert(err.message)},
          next: (response: FilmsListDTO[]) => {this.films=response}
        }
      );
      }
    )

  }

}
