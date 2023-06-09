import {Component, OnInit} from '@angular/core';
import {FilmService} from "./services/film.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "./services/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent implements OnInit{
  username!: string | null;
  searchQuery!: string;

  constructor(private filmService: FilmService, private router: Router, private route: ActivatedRoute){};

    ngOnInit(): void {
      this.username=sessionStorage.getItem("username");
    }

    logout(): void{
      sessionStorage.clear();
      window.location.reload();
    }

    onSearchSubmit(): void{
      sessionStorage.setItem("searchQuery", this.searchQuery);
      SearchService.searchQuery = this.searchQuery;
      this.router.navigate(([]), {queryParams:
          {
            query:this.searchQuery
          }})
    }

  protected readonly SearchService = SearchService;
}
