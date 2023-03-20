import { CustomUser } from "./customUser";
import { Film } from "./film";

export interface Review{
    id: number;
    text: string;
    film: Film;
    author: CustomUser;
}