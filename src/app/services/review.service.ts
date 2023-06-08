import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';
import { LocalReviewDTO } from '../dto/LocalReviewDTO';
import {KinopoiskReviewDTO} from "../dto/KinopoiskReviewDTO";

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

  public getKinopoiskReviews(filmId: number, page:number):Observable<KinopoiskReviewDTO[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("filmId", filmId);
    queryParams = queryParams.append("page", page);
    return this.http.get<KinopoiskReviewDTO[]>(`${this.apiServerUrl}/reviews/kinopoisk`, {params:queryParams})
  }

  public getReviewsPagesQuantity(filmId: number, service: string):Observable<number>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("service", service);
    return this.http.get<number>(`${this.apiServerUrl}/reviews/${filmId}/pages`, {params:queryParams})
  }
}
