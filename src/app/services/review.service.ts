import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';
import { LocalReviewDTO } from '../dto/LocalReviewDTO';
import {KinopoiskReviewDTO} from "../dto/KinopoiskReviewDTO";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public refreshReviews(page: number):Observable<LocalReviewDTO[]>{
    return this.http.get<LocalReviewDTO[]>(`${this.apiServerUrl}/reviews`);
  }

  public addReview(review : LocalReviewDTO, filmId: number):Observable<LocalReviewDTO>{
    return this.http.post<LocalReviewDTO>(`${this.apiServerUrl}/reviews/${filmId}/add`, review);
  }

  public updateReview(review: LocalReviewDTO, reviewId: number):Observable<LocalReviewDTO>{
    return this.http.put<LocalReviewDTO>(`${this.apiServerUrl}/reviews/${reviewId}/update`, review);
  }

  public deleteReview(reviewId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/reviews/${reviewId}/delete`);
  }


  public getReviewsPagesQuantity(filmId: number, service: string):Observable<number>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("service", service);
    // @ts-ignore
    return this.http.get<number>(`${this.apiServerUrl}/reviews/${filmId}/pages`, {params:queryParams});
  }


  public getUsersFilmReview(filmId: number, userId: number):Observable<LocalReviewDTO>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", userId)
    return this.http.get<LocalReviewDTO>(`${this.apiServerUrl}/reviews/${filmId}/current-user-review`, {params:queryParams});
  }

  public translateReview(reviewArr: Set<string>){
    // @ts-ignore
    console.log(<JSON>{"value":Array.from(reviewArr.values())});
    // @ts-ignore
    return this.http.post<any>(`${this.apiServerUrl}/reviews/translate`, <JSON>{"value":Array.from(reviewArr.values())}).subscribe();
  }

  public setReviewsPages(pagesMap: Map<string, number>){
    console.log(JSON.stringify(Object.fromEntries(pagesMap)));
    return this.http.post<any>(`${this.apiServerUrl}/reviews/setPages`, JSON.stringify(Object.fromEntries(pagesMap))).subscribe();
  }
}
