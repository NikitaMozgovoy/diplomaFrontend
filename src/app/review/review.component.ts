import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';
import { UserModel } from '../models/UserModel';
import { UserService } from '../services/user.service';
import { LocalReviewDTO } from '../dto/LocalReviewDTO';
import {FilmDTO} from "../dto/FilmDTO";
import {FilmService} from "../services/film.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  @Input() film!:FilmDTO;
  public apiServerUrl! : string;
  userId!: number;

  constructor(private reviewService: ReviewService, private filmService: FilmService){};

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
    this.userId=Number(sessionStorage.getItem("id"));
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


  public showTextArea(): void{
      // const section=document.getElementById("add-review");
      // const button = document.createElement('button');
      // button.type="button";
      // button.style.display = 'none';
      // button.setAttribute('data-toggle', 'collapse');
      // button.setAttribute('data-target', '#addModal');
      // section?.appendChild(button);
      // button.click();
  }

  public onAddReview(createForm: NgForm, filmId: number) :void {
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
    review.text=editForm.value.text;
    this.reviewService.updateReview(review, review.id).subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response: LocalReviewDTO) => {
          this.updateReviews();
        }
      }
    )
  }


  protected readonly sessionStorage = sessionStorage;
  protected readonly Array = Array;
}
