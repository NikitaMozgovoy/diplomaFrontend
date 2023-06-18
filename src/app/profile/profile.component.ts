import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ReviewService} from "../services/review.service";
import {FilmService} from "../services/film.service";
import {environment} from "../../environments/environment";
import {UserDTO} from "../dto/UserDTO";
import {UserService} from "../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FilmDTO} from "../dto/FilmDTO";
import {resolve} from "@angular/compiler-cli";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private reviewService: ReviewService, private filmService: FilmService, private userService: UserService){};
  apiServerUrl!: string;
  // @ts-ignore
  public user: UserDTO;
  public userId = Number (sessionStorage.getItem("id"));

  async ngOnInit() {
    this.apiServerUrl = environment.apiBaseUrl;
    await this.getUserProfile();
  }


  async getUserProfile() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        {
          error: (err: HttpErrorResponse) => {
            alert(err.message)
          },
          next: async (response: UserDTO) => {
            await this.getFilmNames(response);
            this.user = response;
          }
        }
      )
    }
  }

  async getFilmNames(user: UserDTO){
    for(let review of user.reviews) {
      await lastValueFrom(this.filmService.getFilmById(review.filmId)).then((response)=>
        {
            review.filmName = response.name;
        }
      )
    }
  }

}
