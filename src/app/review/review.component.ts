import { HttpErrorResponse } from '@angular/common/http';
import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';
import { UserModel } from '../models/UserModel';
import { UserService } from '../services/user.service';
import { LocalReviewDTO } from '../dto/LocalReviewDTO';
import {FilmDTO} from "../dto/FilmDTO";
import {FilmService} from "../services/film.service";
import {ReviewAuthorDTO} from "../dto/ReviewAuthorDTO";
import {FilmComponent} from "../film/film.component";
import {EventEmitterService} from "../services/event-emitter.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() film!:FilmDTO;
  apiServerUrl! : string;
  userId = 0;
  currentUserReview!: LocalReviewDTO;
  translatedReviews!: Set<string>;

  localReviewsPages: number = 1;
  kinopoiskReviewsPages: number = 1;
  tmdbReviewsPages: number = 1;

  pagesMap: Map<string, number> = new Map();

  constructor(private reviewService: ReviewService, private filmService: FilmService, private eventEmitterService: EventEmitterService){};


  ngOnInit(){
    this.translatedReviews = new Set();
    this.apiServerUrl = environment.apiBaseUrl;
    this.pagesMap.set("localPage", 1);
    this.pagesMap.set("kinopoiskPage", 1);
    this.pagesMap.set("tmdbPage", 1);
  }

  async ngAfterViewInit() {
    await this.getPages("kinopoisk");
    await this.getPages("local");
    await this.getPages("tmdb");
    this.userId = Number(sessionStorage.getItem("id"));
    await this.getCurrentUserReview();
  }

  ngOnDestroy() {
    this.translateReview("");
  }


  public updateReviews(): void{
    this.filmService.getFilmById(this.film.id).subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response: FilmDTO) => {
          this.film=response;
        }
      }
    )
  }


  public onAddReview(createForm: NgForm, filmId: number) :void {
    // @ts-ignore
    createForm.value.author=new ReviewAuthorDTO(this.userId, sessionStorage.getItem("username"));
    this.reviewService.addReview(createForm.value, filmId).subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response: LocalReviewDTO) => {
          this.eventEmitterService.updateFilmFromReviews();
          this.getCurrentUserReview();
        }
      }
    )
  }

  public onEditReview(editForm: NgForm, review: LocalReviewDTO){
    review.text=editForm.value.editArea;
    review.rating=editForm.value.editRating;
    this.reviewService.updateReview(review, review.id).subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response: LocalReviewDTO) => {
          this.updateReviews();
        }
      }
    )
  }


  public async getCurrentUserReview() {
    if (this.userId != 0) {
      await lastValueFrom(this.reviewService.getUsersFilmReview(this.film.id, this.userId)).then((response) => {
          this.currentUserReview = response;
        }
      )
    }
  }

  public translateReview(reviewId: string){
    if(this.translatedReviews.has(reviewId)){
      this.translatedReviews.delete(reviewId);
      console.log(this.translatedReviews);
    }
    else {
      this.translatedReviews.add(reviewId);
    }
    this.reviewService.translateReview(this.translatedReviews);
    this.eventEmitterService.updateFilmFromReviews();
  }

  public async getPages(service: string) {
    await lastValueFrom(this.reviewService.getReviewsPagesQuantity(this.film.id, service)).then((response) => {
        switch (service) {
          case ("local"): {
            this.localReviewsPages = response;
            break;
          }
          case ("kinopoisk"): {
            this.kinopoiskReviewsPages = response;
            break;
          }
          case("tmdb"): {
            this.tmdbReviewsPages = response;
            break;
          }
        }
      }
    ).catch(error=>{return;})
  }

  public setReviewsPage(page: number, service: string){
    this.pagesMap.set(service, page);
    this.reviewService.setReviewsPages(this.pagesMap);
    this.eventEmitterService.updateFilmFromReviews();
  }


  protected readonly sessionStorage = sessionStorage;
  protected readonly document = document;
}
