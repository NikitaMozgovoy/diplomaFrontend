import {KinopoiskReviewDTO} from "./KinopoiskReviewDTO";
import {LocalReviewDTO} from "./LocalReviewDTO";
import {TmdbReviewDTO} from "./TmdbReviewDto";

export class FilmDTO {
  constructor(
    public id: number,
    public tmdbId: number,
    public name: string,
    public alternativeName: string,
    public year: number,
    public kinopoiskRating: number,
    public tmdbRating: number,
    public imdbRating: number,
    public localRating: number,
    public ageRating: number,
    public countriesList: Array<string>,
    public posterUrl: string,
    public genresList: Array<string>,
    public type: string,
    public description: string,
    public directors: Array<string>,
    public producers: Array<string>,
    public actors: Array<string>,
    public movieLength: number,
    public kinopoiskReviews: Array<KinopoiskReviewDTO>,
    public tmdbReviews: Array<TmdbReviewDTO> | null,
    public localReviews: Array<LocalReviewDTO>
  ) {}
}
