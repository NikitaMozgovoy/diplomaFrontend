import { UserModel } from "./UserModel";

export interface Review{
    id: number;
    text: string;
    filmId: number;
    author: UserModel;
}
