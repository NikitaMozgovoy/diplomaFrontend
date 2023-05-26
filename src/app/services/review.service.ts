import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';
import { LocalReviewDTO } from '../dto/LocalReviewDTO';

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



    // public getFilmReviews(filmId: number):Observable<LocalReviewDTO[]>{
    //     return this.http.get<LocalReviewDTO[]>(`${this.apiServerUrl}/reviews/${filmId}`);
    // }

}
