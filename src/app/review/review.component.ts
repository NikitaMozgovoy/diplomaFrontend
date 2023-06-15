import { HttpErrorResponse } from '@angular/common/http';
import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, AfterViewInit{
  @Input() film!:FilmDTO;
  apiServerUrl! : string;
  userId = 0;
  hasReview: boolean = false;
  review: LocalReviewDTO | undefined;

  constructor(private reviewService: ReviewService, private filmService: FilmService){};


  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
  }

  ngAfterViewInit() {
    this.userId=Number(sessionStorage.getItem("id"));
    this.getCurrentUserReview();
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
    createForm.value.author=new ReviewAuthorDTO(this.userId, sessionStorage.getItem("username"))
    this.reviewService.addReview(createForm.value, filmId).subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response: LocalReviewDTO) => {
          this.updateReviews();
        }
      }
    )
  }

  public onEditReview(editForm: NgForm, review: LocalReviewDTO){
    console.log(editForm.value);
    console.log(review);
    review.text=editForm.value.editArea;
    this.reviewService.updateReview(review, review.id).subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response: LocalReviewDTO) => {
          this.updateReviews();
        }
      }
    )
  }


  public getCurrentUserReview(){
    if (this.userId!=0){
      this.reviewService.getUsersFilmReview(this.film.id, this.userId).subscribe(
        {
          error: (err: HttpErrorResponse) => {
            alert(err.message)
          },
          next: (response: LocalReviewDTO) => {
            this.review = response;
          }
        }
      )
    }
  }


  protected readonly sessionStorage = sessionStorage;
}
