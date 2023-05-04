import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Film } from '../models/film';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';
import { CustomUser } from '../models/customUser';
import { UserService } from '../services/user.service';
import { LocalReviewsDTO } from '../dto/LocalReviewsDTO';
import {FilmDTO} from "../dto/FilmDTO";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  @Input() film!:FilmDTO;
  public filmUrl!: string;
  public localReviews!: LocalReviewsDTO[];
  public apiServerUrl! : string;
  userId!: number;

  constructor(private reviewService: ReviewService){};

  ngOnInit(): void {
    this.apiServerUrl = environment.apiBaseUrl;
    this.getLocalReviews();
    this.userId=Number(sessionStorage.getItem("id"));
  }

  public getLocalReviews(): void{
    this.reviewService.getFilmReviews(this.film.id).subscribe(
      {
        error: (err: HttpErrorResponse) => {alert(err.message)},
        next: (response:LocalReviewsDTO[]) => {this.localReviews=response}
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

  // public onAddReview(createForm: NgForm, filmId: number) :void {
  //     this.reviewService.addReview(createForm.value, filmId).subscribe(
  //       (response: Review) => {
  //         console.log(response);
  //         this.getReviews();
  //       },
  //       (error: HttpErrorResponse) =>{
  //         alert(error.message);
  //       }
  //     );
  //   }
  //
  // public onEditReview(editForm: NgForm, reviewId: number){
  //   this.reviewService.updateReview(editForm.value, reviewId).subscribe(
  //         (response: Review) => {
  //           console.log(response);
  //           this.getReviews();
  //         },
  //         (error: HttpErrorResponse) =>{
  //           alert(error.message);
  //         }
  //       );
  // }
}
