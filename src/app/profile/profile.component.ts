import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ReviewService} from "../services/review.service";
import {FilmService} from "../services/film.service";
import {environment} from "../../environments/environment";
import {UserDTO} from "../dto/UserDTO";
import {UserService} from "../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FilmDTO} from "../dto/FilmDTO";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit{
  constructor(private reviewService: ReviewService, private filmService: FilmService, private userService: UserService){};
  apiServerUrl!: string;
  // @ts-ignore
  public user: UserDTO;
  public userId = Number (sessionStorage.getItem("id"));

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
    this.getUserProfile();
  }

  ngAfterViewInit() {
    this.getFilmNames();
  }

  getUserProfile() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        {
          error: (err: HttpErrorResponse) => {
            alert(err.message)
          },
          next: (response: UserDTO) => {
            this.user = response;
          }
        }
      )
    }
  }

  getFilmNames(){
    for(let review of this.user.reviews) {
      this.filmService.getFilmById(review.filmId).subscribe(
        {
          next: (response: FilmDTO) => {
            review.filmName = response.name;
            console.log(review.filmName, response.name);
          }
        }
      )
    }
  }

}
