import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CustomUser } from './models/customUser';
import { UserService } from './services/user.service';
import {FilmService} from "./services/film.service";
import {FilmDTO} from "./dto/FilmDTO";
import {FilmsListDTO} from "./dto/FilmsListDTO";
import {SearchService} from "./services/search.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent implements OnInit{
  username!: string | null;
  searchQuery: string="";

  constructor(private filmService: FilmService, private searchService: SearchService, private router: Router){};

    ngOnInit(): void {
      this.username=sessionStorage.getItem("username");
    }

    logout(): void{
      sessionStorage.clear();
      window.location.reload();
    }

    onSearchSubmit(): void{
      this.searchService.searchQuery = this.searchQuery;
      console.log(this.searchService.searchQuery);
      this.filmService.getSearchResults(this.searchService.searchQuery, 1).subscribe(
        {
          error: (err: HttpErrorResponse) => {alert(err.message)},
          next: (response: FilmsListDTO[]) => {
            console.log(response);
            this.router.navigate((["/search"]), {queryParams:
                {
                  query:this.searchQuery,
                  page:1
                }})
          }
        }
      );
    }
}
