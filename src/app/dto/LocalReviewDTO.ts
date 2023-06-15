import { ReviewAuthorDTO } from "./ReviewAuthorDTO";

export class LocalReviewDTO {
    constructor(
        public id: number,
        public filmId: number,
        public filmName: string,
        public author: ReviewAuthorDTO,
        public rating: number,
        public text:string
    ) {}
}
