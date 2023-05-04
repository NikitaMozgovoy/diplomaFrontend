import {KinopoiskReviewDTO} from "./KinopoiskReviewDTO";
import {LocalReviewsDTO} from "./LocalReviewsDTO";

export class FilmDTO {
  constructor(
    public id: number,
    public name: string,
    public year: number,
    public countriesList: Array<string>,
    public posterUrl: string,
    public genresList: Array<string>,
    public type: string,
    public description: string,
    public director: Array<string>,
    public movieLength: number,
    public kinopoiskReviews: Array<KinopoiskReviewDTO>,
    public localReviews: Array<LocalReviewsDTO>
  ) {}
}