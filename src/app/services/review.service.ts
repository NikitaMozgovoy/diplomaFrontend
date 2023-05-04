import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Film } from '../models/film';
import { Review } from '../models/review';
import { LocalReviewsDTO } from '../dto/LocalReviewsDTO';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getAllReviews():Observable<LocalReviewsDTO[]>{
        return this.http.get<LocalReviewsDTO[]>(`${this.apiServerUrl}/reviews`);
    }

    public addReview(review : Review, filmId: number):Observable<Review>{
        return this.http.post<Review>(`${this.apiServerUrl}/reviews/add/${filmId}`, review);
    }

    public updateReview(review: Review, reviewId: number):Observable<Review>{
        return this.http.put<Review>(`${this.apiServerUrl}/reviews/update/${reviewId}`, review);
    }

    public deleteReview(reviewId: number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/reviews/delete/${reviewId}`);
    }

    public getFilmReviews(filmId: number):Observable<LocalReviewsDTO[]>{
        return this.http.get<LocalReviewsDTO[]>(`${this.apiServerUrl}/reviews/${filmId}`);
    }

}
