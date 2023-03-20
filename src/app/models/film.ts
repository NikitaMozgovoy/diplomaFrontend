import { Genre } from "./genre";
import { Review } from "./review";

export interface Film{
    id: number;
    name: string;
    year: number;
    director: string;
    country: string;
    url: string;
    imageUrl: string;
    genres: Array<Genre>;
    reviews: Array<Review>;
}